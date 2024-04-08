/* 
https://www.acmicpc.net/problem/28279

---덱 2---

--문제
정수를 저장하는 덱을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

1 X: 정수 X를 덱의 앞에 넣는다. (1 ≤ X ≤ 100,000)
2 X: 정수 X를 덱의 뒤에 넣는다. (1 ≤ X ≤ 100,000)
3: 덱에 정수가 있다면 맨 앞의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
4: 덱에 정수가 있다면 맨 뒤의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
5: 덱에 들어있는 정수의 개수를 출력한다.
6: 덱이 비어있으면 1, 아니면 0을 출력한다.
7: 덱에 정수가 있다면 맨 앞의 정수를 출력한다. 없다면 -1을 대신 출력한다.
8: 덱에 정수가 있다면 맨 뒤의 정수를 출력한다. 없다면 -1을 대신 출력한다.
입력
첫째 줄에 명령의 수 N이 주어진다. (1 ≤ N ≤ 1,000,000)

둘째 줄부터 N개 줄에 명령이 하나씩 주어진다.

출력을 요구하는 명령은 하나 이상 주어진다.

--출력
출력을 요구하는 명령이 주어질 때마다 명령의 결과를 한 줄에 하나씩 출력한다.

-예제 입력 1 
11
6
1 3
1 8
7
8
3
2 5
1 2
5
4
4
-예제 출력 1 
1
8
3
8
3
5
3
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

const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .slice(1);

const deque = new Deque();
const result = [];

for (let opStr of input) {
  const [op, x] = opStr.split(" ").map(Number);

  switch (op) {
    case 1:
      deque.pushFront(x);
      break;
    case 2:
      deque.pushBack(x);
      break;
    case 3:
      result.push(deque.popFront());
      break;
    case 4:
      result.push(deque.popBack());
      break;
    case 5:
      result.push(deque.size());
      break;
    case 6:
      if (deque.isEmpty()) result.push(1);
      else result.push(0);
      break;
    case 7:
      if (deque.isEmpty()) result.push(-1);
      else result.push(deque.peekFront());
      break;
    case 8:
      if (deque.isEmpty()) result.push(-1);
      else result.push(deque.peekBack());
      break;
  }
}

console.log(result.join("\n"));
