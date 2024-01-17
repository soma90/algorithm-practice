/* 
https://www.acmicpc.net/problem/11005

---진법 변환 2---

시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
0.5 초 (추가 시간 없음)	256 MB	41180	19386	16703	47.209%
문제
10진법 수 N이 주어진다. 이 수를 B진법으로 바꿔 출력하는 프로그램을 작성하시오.

10진법을 넘어가는 진법은 숫자로 표시할 수 없는 자리가 있다. 이런 경우에는 다음과 같이 알파벳 대문자를 사용한다.

A: 10, B: 11, ..., F: 15, ..., Y: 34, Z: 35

--입력
첫째 줄에 N과 B가 주어진다. (2 ≤ B ≤ 36) N은 10억보다 작거나 같은 자연수이다.

--출력
첫째 줄에 10진법 수 N을 B진법으로 출력한다.

-예제 입력 1 
60466175 36
-예제 출력 1 
ZZZZZ
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ");

let num = Number(input[0]);
const notation = Number(input[1]);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numMap = new Map();
let result = [];

//0 ~ Z 까지 map에 저장
for (let i = 0; i < 10; i++) {
  numMap.set(i, String(i));
}
for (let i = 0; i < alphabet.length; i++) {
  numMap.set(i + 10, alphabet[i]);
}

//진법 변환
while (num / notation !== 0) {
  result.push(numMap.get(num % notation));
  num = Math.floor(num / notation);
}

console.log(result.reverse().join(""));
