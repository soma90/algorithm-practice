/* 
https://www.acmicpc.net/problem/11050

---이항 계수 1---

--문제
자연수 
N과 정수 K가 주어졌을 때 이항 계수 (N, K)를 구하는 프로그램을 작성하시오.

--입력
첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 0 ≤ K ≤ N)

--출력
 
(N, K)를 출력한다.

-예제 입력 1 
5 2
-예제 출력 1 
10
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();
const [N, K] = input.split(" ").map(Number);

let result = 0;

const combination = (index = 0, selected = []) => {
  if (selected.length === K) {
    result++;
    return;
  }

  for (let i = index; i < N; i++) {
    combination(i + 1, [...selected, i]);
  }
};

combination();

console.log(result);
