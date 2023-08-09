/* 
---N-Queen---

--문제 설명
가로, 세로 길이가 n인 정사각형으로된 체스판이 있습니다. 체스판 위의 n개의 퀸이 서로를 공격할 수 
없도록 배치하고 싶습니다.

예를 들어서 n이 4인경우 다음과 같이 퀸을 배치하면 n개의 퀸은 서로를 한번에 공격 할 수 없습니다.

Imgur
Imgur

체스판의 가로 세로의 세로의 길이 n이 매개변수로 주어질 때, n개의 퀸이 조건에 만족 하도록 배치할 
수 있는 방법의 수를 return하는 solution함수를 완성해주세요.

--제한사항
퀸(Queen)은 가로, 세로, 대각선으로 이동할 수 있습니다.
n은 12이하의 자연수 입니다.

--입출력 예
n	result
4	2

--입출력 예 설명
-입출력 예 #1
문제의 예시와 같습니다.
*/

function solution(n) {
  let answer = 0;
  let visited = Array(n).fill(-1);

  const dfs = (row, v) => {
    if (row === n) {
      console.log(v);
      answer++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col, v)) {
        v[row] = col;
        dfs(row + 1, v);
        v[row] = -1;
      }
    }
  };
  //Q를 위치할 수 있는지 세로, 대각선 확인
  const isSafe = (r, c, v) => {
    for (let i = 0; i < r; i++) {
      if (v[i] === c || Math.abs(v[i] - c) === Math.abs(i - r)) {
        return false;
      }
    }
    return true;
  };

  dfs(0, visited);
  return answer;
}

//완전 탐색은 시간초과
/* function solution(n) {
  let answer = 0;
  let visited = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  const dfs = (v, count = 0, r = 0) => {
    if (count === n) {
      console.log(v);
      answer++;
      return;
    }

    for (let i = r; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!v[i][j]) {
          v[i][j] = 1;
          //Q있는지 확인
          if (!hasQueen(i, j, v)) {
            v[i][j] = 2;
            dfs(v, count + 1, i);
          }
          v[i][j] = 0;
        }
      }
    }
  };

  const hasQueen = (r, c, v) => {
    const dr = [0, 0, -1, 1, -1, -1, 1, 1];
    const dc = [1, -1, 0, 0, -1, 1, -1, 1];
    let hasQ = false;
    for (let i = 0; i < dr.length; i++) {
      for (let j = 1; ; j++) {
        let nr = r + dr[i] * j;
        let nc = c + dc[i] * j;

        if (v[nr] === undefined || v[nr][nc] === undefined) break;
        if (v[nr][nc] === 2) return true;
      }
    }
    return hasQ;
  };

  dfs(visited);
  return answer;
} */



let result = solution(4);
console.log(result);
