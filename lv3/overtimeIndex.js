/*  
https://school.programmers.co.kr/learn/courses/30/lessons/12927

---야근 지수---

--문제 설명
회사원 Demi는 가끔은 야근을 하는데요, 야근을 하면 야근 피로도가 쌓입니다. 야근 피로도는 야근을 시작한 
시점에서 남은 일의 작업량을 제곱하여 더한 값입니다. Demi는 N시간 동안 야근 피로도를 최소화하도록 일할 겁니다.
Demi가 1시간 동안 작업량 1만큼을 처리할 수 있다고 할 때, 퇴근까지 남은 N 시간과 각 일에 대한 작업량 works에 
대해 야근 피로도를 최소화한 값을 리턴하는 함수 solution을 완성해주세요.

--제한 사항
works는 길이 1 이상, 20,000 이하인 배열입니다.
works의 원소는 50000 이하인 자연수입니다.
n은 1,000,000 이하인 자연수입니다.

--입출력 예
works	n	result
[4, 3, 3]	4	12
[2, 1, 2]	1	6
[1,1]	3	0

--입출력 예 설명
입출력 예 #1
n=4 일 때, 남은 일의 작업량이 [4, 3, 3] 이라면 야근 지수를 최소화하기 위해 4시간동안 일을 한 결과는 [2, 2, 2]입니다. 
이 때 야근 지수는 22 + 22 + 22 = 12 입니다.

입출력 예 #2
n=1일 때, 남은 일의 작업량이 [2,1,2]라면 야근 지수를 최소화하기 위해 1시간동안 일을 한 결과는 [1,1,2]입니다. 
야근지수는 12 + 12 + 22 = 6입니다.

입출력 예 #3
남은 작업량이 없으므로 피로도는 0입니다.
*/

class MaxHeap {
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
    while (true) {
      let parentIndex = Math.floor((index - 1) / 2);
      //부모보다 자식이 크면 자리 바꾸기
      if (this.items[index] > this.items[parentIndex]) {
        this.swap(index, parentIndex);
      } else break;
      index = parentIndex;
      if (index < 1) break;
    }
  }

  popMax() {
    const maxVal = this.items[0];
    this.items[0] = this.items.at(-1);
    this.items.pop();
    if (this.items.length <= 1) return maxVal;

    let index = 0;
    while (true) {
      //두 자식중 작은값의 자식 인덱스 찾기
      let lChildIndex = index * 2 + 1;
      let rChildIndex = index * 2 + 2;
      let minIndex = index;
      if (
        lChildIndex < this.items.length &&
        this.items[minIndex] < this.items[lChildIndex]
      ) {
        minIndex = lChildIndex;
      }
      if (
        rChildIndex < this.items.length &&
        this.items[minIndex] < this.items[rChildIndex]
      ) {
        minIndex = rChildIndex;
      }
      //위치 바꾸기
      if (minIndex !== index) {
        this.swap(index, minIndex);
        index = minIndex;
      } else break;
    }
    return maxVal;
  }
}

function solution(n, works) {
  let worksHeap = new MaxHeap();
  works.forEach((el) => worksHeap.insert(el));

  for (let i = 0; i < n; i++) {
    const max = worksHeap.popMax() - 1;
    if (max > 0) worksHeap.insert(max);
  }

  return worksHeap.items.reduce((acc, cur) => (acc += cur ** 2), 0);
}

let result = solution(4, [4, 3, 3]);
console.log(result);
