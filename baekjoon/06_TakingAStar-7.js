/* 
https://www.acmicpc.net/problem/2444

---별 찍기 - 7 ---

--문제
예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

--입력
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

--출력
첫째 줄부터 2×N-1번째 줄까지 차례대로 별을 출력한다.

--예제 입력 1 
5
--예제 출력 1 
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
*/

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(" ");
let num = parseInt(input[0]);

for (let i = 1; i <= num; i++) {
  console.log(" ".repeat(num - i) + "*".repeat(i * 2 - 1));
}

for (let i = 1; i < num; i++) {
  console.log(" ".repeat(i) + "*".repeat(num * 2 - 1 - i * 2));
}
