/* 
https://www.acmicpc.net/problem/1978

---소수 찾기---

--문제
주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하시오.

--입력
첫 줄에 수의 개수 N이 주어진다. N은 100이하이다. 다음으로 N개의 수가 주어지는데 수는 1,000 이하의 자연수이다.

--출력
주어진 수들 중 소수의 개수를 출력한다.

-예제 입력 1 
4
1 3 5 7
-예제 출력 1 
3
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const isPrimeNumber = (num) => {
  if (num === 1) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
};

let result = 0;

input[1]
  .split(" ")
  .map(Number)
  .forEach((num) => isPrimeNumber(num) && result++);

console.log(result);
