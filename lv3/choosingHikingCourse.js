function solution(n, paths, gates, summits) {
  let answer = [0, Infinity];
  let intensity = Array.from({ length: n + 1 }, () => Infinity);
  let heap = new MinHeap();
  let pathsMap = new Map();
  let gatesMap = new Map();
  let summitsMap = new Map();

  //paths gates summits map으로 저장
  for (const path of paths) {
    pathsMap.set(path[0], [
      ...(pathsMap.get(path[0]) || []),
      [path[1], path[2]],
    ]);
    pathsMap.set(path[1], [
      ...(pathsMap.get(path[1]) || []),
      [path[0], path[2]],
    ]);
  }
  for (const gate of gates) {
    gatesMap.set(gate, true);
    //heap에 출입구 정보 넣어주기
    intensity[gate] = 0;
    heap.insert([gate, 0]);
  }
  for (const summit of summits) {
    summitsMap.set(summit, true);
  }

  //다익스트라를 이용해 지점별 최소 intensity 갱신
  while (heap.items.length > 0) {
    console.log(11, heap.items);
    const [point, itsity] = heap.popMin();
    //intensity[point] = Math.min(intensity[point], itsity);
    if (
      intensity[point] < itsity ||
      summitsMap.get(point) //산봉우리일 경우
    )
      continue;

    for (let [nextPoint, nextItsity] of pathsMap.get(point)) {
      const nextItsityMax = Math.max(nextItsity, intensity[point]);
      if (intensity[nextPoint] <= nextItsityMax) continue;

      intensity[nextPoint] = nextItsityMax;
      heap.insert([nextPoint, nextItsityMax]);
    }
  }

  //intensity가 최소값과 봉우리 구하기
  summits
    .sort((a, b) => a - b)
    .forEach((summit) => {
      if (intensity[summit] < answer[1]) answer = [summit, intensity[summit]];
    });
  //console.log(intensity);
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
      if (this.items[index][1] < this.items[parentIndex][1]) {
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
        this.items[minIndex][1] > this.items[lChildIndex][1]
      ) {
        minIndex = lChildIndex;
      }
      if (
        rChildIndex < this.items.length &&
        this.items[minIndex][1] > this.items[rChildIndex][1]
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
}

let result = solution(
  6,
  [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
  ],
  [1, 3],
  [5]
);
console.log(result);
