/* 
---더 맵게---

--문제 설명
매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 
모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 
아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 
모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

--제한 사항
scoville의 길이는 2 이상 1,000,000 이하입니다.
K는 0 이상 1,000,000,000 이하입니다.
scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

--입출력 예
scoville	K	return
[1, 2, 3, 9, 10, 12]	7	2

--입출력 예 설명
스코빌 지수가 1인 음식과 2인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 1 + (2 * 2) = 5
가진 음식의 스코빌 지수 = [5, 3, 9, 10, 12]

스코빌 지수가 3인 음식과 5인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 3 + (5 * 2) = 13
가진 음식의 스코빌 지수 = [13, 9, 10, 12]

모든 음식의 스코빌 지수가 7 이상이 되었고 이때 섞은 횟수는 2회입니다.
*/

class Heap {
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
      //부모보다 자식이 작으면 자리 바꾸기
      if (this.items[index] < this.items[parentIndex]) {
        this.swap(index, parentIndex);
      } else break;
      index = parentIndex;
      if (index < 1) break;
    }
  }

  removeMin() {
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    if (this.items.length <= 1) return;

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
  }
}

function solution(scoville, K) {
  let answer = 0;

  //힙생성과 scoville 힙에 저장
  let scovilleHeap = new Heap();
  scoville.forEach((el) => {
    scovilleHeap.insert(el);
  });

  //스코빌 지수 설정
  while (true) {
    if (scovilleHeap.items[0] >= K) break;
    if (scovilleHeap.items.length <= 1) {
      answer = -1;
      break;
    }    

    const low1 = scovilleHeap.items[0];
    scovilleHeap.removeMin();
    const low2 = scovilleHeap.items[0];
    scovilleHeap.removeMin();
    scovilleHeap.insert(low1 + low2 * 2);

    answer++;
  }

  return answer;
}

let result = solution([2, 3], 7);
console.log(result);
