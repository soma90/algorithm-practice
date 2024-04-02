/* 
https://www.acmicpc.net/problem/28278

---스택 2---

--문제
정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

1 X: 정수 X를 스택에 넣는다. (1 ≤ X ≤ 100,000)
2: 스택에 정수가 있다면 맨 위의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
3: 스택에 들어있는 정수의 개수를 출력한다.
4: 스택이 비어있으면 1, 아니면 0을 출력한다.
5: 스택에 정수가 있다면 맨 위의 정수를 출력한다. 없다면 -1을 대신 출력한다.

--입력
첫째 줄에 명령의 수 N이 주어진다. (1 ≤ N ≤ 1,000,000)

둘째 줄부터 N개 줄에 명령이 하나씩 주어진다.

출력을 요구하는 명령은 하나 이상 주어진다.

--출력
출력을 요구하는 명령이 주어질 때마다 명령의 결과를 한 줄에 하나씩 출력한다.

-예제 입력 1 
9
4
1 3
1 5
3
2
5
2
2
5
-예제 출력 1 
1
2
5
3
3
-1
-1
*/

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .slice(1);

class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    if (this.size() === 0) return -1;
    return this.items.pop();
  }
  peek() {
    if (this.size() === 0) return -1;
    return this.items[this.items.length - 1];
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    if (this.size() === 0) return 1;
    return 0;
  }
}

const stack = new Stack();
let result = [];

for (const order of input) {
  const [no, x] = order.split(" ").map(Number);

  switch (no) {
    case 1:
      stack.push(x);
      break;
    case 2:
      result.push(stack.pop());
      break;
    case 3:
      result.push(stack.size());
      break;
    case 4:
      result.push(stack.isEmpty());
      break;
    case 5:
      result.push(stack.peek());
      break;
  }
}

console.log(result.join("\n"));
