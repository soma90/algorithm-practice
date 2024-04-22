/* 
---N-Queen---

--문제
N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.

N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.

--입력
첫째 줄에 N이 주어진다. (1 ≤ N < 15)

--출력
첫째 줄에 퀸 N개를 서로 공격할 수 없게 놓는 경우의 수를 출력한다.

-예제 입력 1 
8
-예제 출력 1 
92
*/

const fs = require("fs");
const input = Number(fs.readFileSync("/dev/stdin").toString());

const isAvailable = (index, selected) => {
  const row = selected.length;

  for (let r = 0; r < selected.length; r++) {
    //세로 체크
    if (index === selected[r]) return false;
    //대각선 체크
    //현재위치와 체크하는 위치의 가로값과 세로값이 같으면 대각선에 위치
    if (Math.abs(index - selected[r]) === Math.abs(r - row)) return false;
  }

  return true;
};

let result = 0;

const combination = (selected = []) => {
  if (selected.length === input) {
    result++;
    return;
  }

  for (let i = 0; i < input; i++) {
    if (isAvailable(i, selected)) {
      combination([...selected, i]);
    }
  }
};

combination();

console.log(result);
