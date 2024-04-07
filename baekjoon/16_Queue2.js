/* 
https://www.acmicpc.net/problem/18258

---큐 2---

--문제
정수를 저장하는 큐를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여섯 가지이다.

push X: 정수 X를 큐에 넣는 연산이다.
pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 
경우에는 -1을 출력한다.
size: 큐에 들어있는 정수의 개수를 출력한다.
empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.

--입력
첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 2,000,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 
하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 
명령이 주어지는 경우는 없다.

--출력
출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.

-예제 입력 1 
15
push 1
push 2
front
back
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
front
-예제 출력 1 
1
2
2
0
1
2
-1
0
1
-1
0
3
*/

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.len = 0;
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }
  enqueue(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;
    // after doing all that we are going to shift the new node rear pointer to the new node

    this.rear = newNode;
    this.len++;
  }

  dequeue() {
    if (this.isEmpty()) return -1;
    this.front = this.front.next;
    // this.front == null
    // previously in the queue there was only one element and that was deleted
    // so this.rear have to be shifted to newNode;
    if (!this.front) this.rear = null;
    this.len--;
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

  display() {
    if (this.isEmpty()) return;
    let curr = this.front;
    process.stdout.write("(FRONT) ");
    // when the curr hits the rear pointer is going to stop.
    // it will make curr to stop at the last node.
    while (curr != this.rear) {
      process.stdout.write(`${curr.data} ---> `);
      curr = curr.next;
    }
    process.stdout.write(`${this.rear.data} (REAR)\n`);
  }
}

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .slice(1);

const queue = new Queue();
const result = [];

for (cmd of input) {
  const [cmdStr, n] = cmd.split(" ");

  switch (cmdStr) {
    case "push":
      queue.enqueue(Number(n));
      break;
    case "pop":
      result.push(queue.peekFront());
      queue.dequeue();
      break;
    case "size":
      result.push(queue.size());
      break;
    case "empty":
      if (queue.isEmpty()) result.push(1);
      else result.push(0);
      break;
    case "front":
      result.push(queue.peekFront());
      break;
    case "back":
      result.push(queue.peekBack());
      break;
  }
}

console.log(result.join("\n"));
