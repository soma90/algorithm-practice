/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12920

---선입 선출 스케줄링---

--문제 설명
처리해야 할 동일한 작업이 n 개가 있고, 이를 처리하기 위한 CPU가 있습니다.

이 CPU는 다음과 같은 특징이 있습니다.

CPU에는 여러 개의 코어가 있고, 코어별로 한 작업을 처리하는 시간이 다릅니다.
한 코어에서 작업이 끝나면 작업이 없는 코어가 바로 다음 작업을 수행합니다.
2개 이상의 코어가 남을 경우 앞의 코어부터 작업을 처리 합니다.
처리해야 될 작업의 개수 n과, 각 코어의 처리시간이 담긴 배열 cores 가 매개변수로 주어질 때, 
마지막 작업을 처리하는 코어의 번호를 return 하는 solution 함수를 완성해주세요.

--제한 사항
코어의 수는 10,000 이하 2이상 입니다.
코어당 작업을 처리하는 시간은 10,000이하 입니다.
처리해야 하는 일의 개수는 50,000개를 넘기지 않습니다.

--입출력 예
n	cores	result
6	[1,2,3]	2

--입출력 예 설명
-입출력 예 #1
처음 3개의 작업은 각각 1,2,3번에 들어가고, 1시간 뒤 1번 코어에 4번째 작업,
다시 1시간 뒤 1,2번 코어에 5,6번째 작업이 들어가므로 2를 반환해주면 됩니다.
*/

function solution(n, cores) {
  if (n <= cores.length) return n;

  let rest = n - cores.length; //처음 코어에 실행되는 작업량을 뺀 작업량
  let left = Math.min(...cores);
  let right =
    rest >= cores.length
      ? (Math.max(...cores) * rest) / cores.length
      : Math.max(...cores) * rest;
  let work = 0;
  let exeCore = [];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    //mid시간에 수행할 수 있는 작업량, mid시간에 실행 시작된 코어 구하기
    work = 0;
    exeCore = [];
    for (let i = 0; i < cores.length; i++) {
      work += Math.floor(mid / cores[i]);
      if (mid % cores[i] === 0) exeCore.push(i + 1);
    }

    /* 작업량이 rest 이상이고, 작업량이 rest+실행시작된인코어수 미만이고, 실행 시작된 코어가 있는경우
    mid는 작업이 완료된 시간, work는 mid시간 동안 수행된 작업량(실제작업량 보다 같거나 큰값이다) */
    if (work >= rest && work < rest + exeCore.length && exeCore.length > 0)
      break;

    if (work < rest) left = mid + 1;
    else right = mid - 1;
  }
  //console.log(work, exeCore, rest - work - 1);
  return exeCore.at(rest - work - 1);
}

let result = solution(5, [4540, 6383, 8674, 2699]);
console.log(result); //4


//minHeap을 이용한 풀이, 시간초과로 실패
/* 
function solution(n, cores) {
  let answer = 0;
  let available = new MinHeap();
  let endWork = new Map();
  let time = 0;

  //core번호 minHeap에 넣어주기
  for (let i = 0; i < cores.length; i++) {
    available.insert(i);
  }

  while (n > 0) {    
    //core 작업 종료
    for (let coreNum of endWork.get(time) || []) {
      available.insert(coreNum);
    }
    
    //core에 작업배정
    while (available.items.length > 0) {
      const coreNum = available.popMin();
      const endTime = time + cores[coreNum];
      if (--n === 0) return coreNum + 1;
      endWork.set(endTime, [...(endWork.get(endTime) || []), coreNum]);
    }
    
    time++;
  }

  return answer;
}

class MinHeap {
  constructor() {
    this.items = [];
  }

  swap(index1, index2) {
    [this.items[index1], this.items[index2]] = [
      this.items[index2],
      this.items[index1],
    ];
  }

  insert(val) {
    this.items.push(val);
    let index = this.items.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      //부모보다 자식이 작으면 자리 바꾸기
      if (this.items[index] < this.items[parentIndex]) {
        this.swap(index, parentIndex);
      } else break;
      index = parentIndex;
    }
  }

  popMin() {
    const minVal = this.items[0];
    this.items[0] = this.items.at(-1);
    this.items.pop();
    if (this.items.length <= 1) return minVal;

    let index = 0;
    while (true) {
      //두 자식중 작은값의 자식 인덱스 찾기
      let lChildIndex = index * 2 + 1;
      let rChildIndex = index * 2 + 2;
      let minIndex = index;
      if (
        lChildIndex < this.items.length &&
        this.items[minIndex] > this.items[lChildIndex]
      ) {
        minIndex = lChildIndex;
      }
      if (
        rChildIndex < this.items.length &&
        this.items[minIndex] > this.items[rChildIndex]
      ) {
        minIndex = rChildIndex;
      }
      //위치 바꾸기
      if (minIndex !== index) {
        this.swap(index, minIndex);
        index = minIndex;
      } else break;
    }
    return minVal;
  }
} */
