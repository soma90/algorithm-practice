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
