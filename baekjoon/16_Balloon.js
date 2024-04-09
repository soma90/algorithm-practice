/* 
https://www.acmicpc.net/problem/2346

---풍선 터뜨리기---

--문제
1번부터 N번까지 N개의 풍선이 원형으로 놓여 있고. i번 풍선의 오른쪽에는 i+1번 풍선이 있고, 왼쪽에는 
i-1번 풍선이 있다. 단, 1번 풍선의 왼쪽에 N번 풍선이 있고, N번 풍선의 오른쪽에 1번 풍선이 있다. 
각 풍선 안에는 종이가 하나 들어있고, 종이에는 -N보다 크거나 같고, N보다 작거나 같은 정수가 하나 
적혀있다. 이 풍선들을 다음과 같은 규칙으로 터뜨린다.

우선, 제일 처음에는 1번 풍선을 터뜨린다. 다음에는 풍선 안에 있는 종이를 꺼내어 그 종이에 적혀있는 
값만큼 이동하여 다음 풍선을 터뜨린다. 양수가 적혀 있을 경우에는 오른쪽으로, 음수가 적혀 있을 때는 
왼쪽으로 이동한다. 이동할 때에는 이미 터진 풍선은 빼고 이동한다.

예를 들어 다섯 개의 풍선 안에 차례로 3, 2, 1, -3, -1이 적혀 있었다고 하자. 이 경우 3이 적혀 있는 
1번 풍선, -3이 적혀 있는 4번 풍선, -1이 적혀 있는 5번 풍선, 1이 적혀 있는 3번 풍선, 2가 적혀 있는 
2번 풍선의 순서대로 터지게 된다.

--입력
첫째 줄에 자연수 N(1 ≤ N ≤ 1,000)이 주어진다. 다음 줄에는 차례로 각 풍선 안의 종이에 적혀 있는 
수가 주어진다. 종이에 0은 적혀있지 않다.

--출력
첫째 줄에 터진 풍선의 번호를 차례로 나열한다.

-예제 입력 1 
5
3 2 1 -3 -1
-예제 출력 1 
1 4 5 3 2
*/

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.front = null;
    this.rear = null;
    this.len = 0;
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }

  pushFront(data) {
    const newNode = new Node(data);
    newNode.next = this.front;

    if (!this.isEmpty()) this.front.prev = newNode;
    else this.rear = newNode;

    this.front = newNode;
    this.len++;
  }

  pushBack(data) {
    const newNode = new Node(data);
    newNode.prev = this.rear;

    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;

    this.rear = newNode;
    this.len++;
  }

  popFront() {
    if (this.isEmpty()) return -1;

    const frontNode = this.front;
    this.front = this.front.next;

    if (!this.front) this.rear = null;
    else this.front.prev = null;

    this.len--;
    return frontNode.data;
  }

  popBack() {
    if (this.isEmpty()) return -1;

    const rearNode = this.rear;
    this.rear = this.rear.prev;

    if (!this.rear) this.front = null;
    else this.rear.next = null;

    this.len--;
    return rearNode.data;
  }

  peekFront() {
    if (this.isEmpty()) return -1;
    return this.front.data;
  }

  peekBack() {
    if (this.isEmpty()) return -1;
    return this.rear.data;
  }

  size() {
    return this.len;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const deque = new Deque();
input[1].split(" ").forEach((el, i) => {
  deque.pushBack([Number(el), i + 1]);
});

const result = [];
let [count, balloonIndex] = deque.popFront();
result.push(balloonIndex);

while (deque.size() > 0) {
  for (let i = 0; i < Math.abs(count) - 1; i++) {
    if (count > 0) deque.pushBack(deque.popFront());
    else deque.pushFront(deque.popBack());
  }

  let balloonData;
  if (count > 0) balloonData = deque.popFront();
  else balloonData = deque.popBack();

  result.push(balloonData[1]);
  count = balloonData[0] % Number(input[0]);
}

console.log(result.join(" "));

/* const balloon = input[1].split(" ").map(Number);
const maxBalloon = Number(input[0]);

const result = [];
let currIndex = 0;
result.push(currIndex + 1);

while (result.length < maxBalloon) {
  const maxCount = Math.abs(balloon[currIndex] % maxBalloon);
  const dir = balloon[currIndex] > 0 ? 1 : -1;
  balloon[currIndex] = 0;
  let count = 0;

  while (maxCount > count) {
    currIndex = (currIndex + maxBalloon + dir) % maxBalloon;
    if (balloon[currIndex] !== 0) count++;
  }

  result.push(currIndex + 1);
}

console.log(result.join(" ")); */
