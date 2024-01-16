/* 
https://www.acmicpc.net/problem/2745

---진법 변환 성공---

--문제
B진법 수 N이 주어진다. 이 수를 10진법으로 바꿔 출력하는 프로그램을 작성하시오.

10진법을 넘어가는 진법은 숫자로 표시할 수 없는 자리가 있다. 
이런 경우에는 다음과 같이 알파벳 대문자를 사용한다.

A: 10, B: 11, ..., F: 15, ..., Y: 34, Z: 35

--입력
첫째 줄에 N과 B가 주어진다. (2 ≤ B ≤ 36)

B진법 수 N을 10진법으로 바꾸면, 항상 10억보다 작거나 같다.

--출력
첫째 줄에 B진법 수 N을 10진법으로 출력한다.

-예제 입력 1 
ZZZZZ 36
-예제 출력 1 
60466175
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ");

const num = input[0];
const notation = Number(input[1]);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numMap = new Map();
let result = 0;

//0 ~ Z 까지 map에 저장
for (let i = 0; i < 10; i++) {
  numMap.set(String(i), i);
}
for (let i = 0; i < alphabet.length; i++) {
  numMap.set(alphabet[i], i + 10);
}

//진법 변환
for (let i = 0; i < num.length; i++) {
  result += notation ** i * numMap.get(num[num.length - 1 - i]);
}

console.log(result);
//console.log(parseInt(num, notation))
