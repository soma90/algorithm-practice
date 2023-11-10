/* 
https://school.programmers.co.kr/learn/courses/30/lessons/60063

---블록 이동하기---

--문제 설명
로봇개발자 "무지"는 한 달 앞으로 다가온 "카카오배 로봇경진대회"에 출품할 로봇을 준비하고 있습니다. 
준비 중인 로봇은 2 x 1 크기의 로봇으로 "무지"는 "0"과 "1"로 이루어진 N x N 크기의 지도에서 
2 x 1 크기인 로봇을 움직여 (N, N) 위치까지 이동 할 수 있도록 프로그래밍을 하려고 합니다. 로봇이 
이동하는 지도는 가장 왼쪽, 상단의 좌표를 (1, 1)로 하며 지도 내에 표시된 숫자 "0"은 빈칸을 "1"은 
벽을 나타냅니다. 로봇은 벽이 있는 칸 또는 지도 밖으로는 이동할 수 없습니다. 로봇은 처음에 아래 
그림과 같이 좌표 (1, 1) 위치에서 가로방향으로 놓여있는 상태로 시작하며, 앞뒤 구분없이 움직일 수 
있습니다.

블럭이동-1.jpg

로봇이 움직일 때는 현재 놓여있는 상태를 유지하면서 이동합니다. 예를 들어, 위 그림에서 오른쪽으로 
한 칸 이동한다면 (1, 2), (1, 3) 두 칸을 차지하게 되며, 아래로 이동한다면 (2, 1), (2, 2) 두 칸을 
차지하게 됩니다. 로봇이 차지하는 두 칸 중 어느 한 칸이라도 (N, N) 위치에 도착하면 됩니다.

로봇은 다음과 같이 조건에 따라 회전이 가능합니다.

블럭이동-2.jpg

위 그림과 같이 로봇은 90도씩 회전할 수 있습니다. 단, 로봇이 차지하는 두 칸 중, 어느 칸이든 축이 될 
수 있지만, 회전하는 방향(축이 되는 칸으로부터 대각선 방향에 있는 칸)에는 벽이 없어야 합니다. 로봇이 
한 칸 이동하거나 90도 회전하는 데는 걸리는 시간은 정확히 1초 입니다.

"0"과 "1"로 이루어진 지도인 board가 주어질 때, 로봇이 (N, N) 위치까지 이동하는데 필요한 
최소 시간을 return 하도록 solution 함수를 완성해주세요.

--제한사항
board의 한 변의 길이는 5 이상 100 이하입니다.
board의 원소는 0 또는 1입니다.
로봇이 처음에 놓여 있는 칸 (1, 1), (1, 2)는 항상 0으로 주어집니다.
로봇이 항상 목적지에 도착할 수 있는 경우만 입력으로 주어집니다.

--입출력 예
board	result
[[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]]	7

--입출력 예에 대한 설명
문제에 주어진 예시와 같습니다.
로봇이 오른쪽으로 한 칸 이동 후, (1, 3) 칸을 축으로 반시계 방향으로 90도 회전합니다. 
다시, 아래쪽으로 3칸 이동하면 로봇은 (4, 3), (5, 3) 두 칸을 차지하게 됩니다. 이제 (5, 3)을 축으로 
시계 방향으로 90도 회전 후, 오른쪽으로 한 칸 이동하면 (N, N)에 도착합니다. 따라서 목적지에 
도달하기까지 최소 7초가 걸립니다.
*/

/* function solution(board) {
  let answer = 0;
  const len = board.length;
  let visited = new Map();

  //직선 이동
  const dr = [
    [1, 1], //동
    [0, 0], //남
    [0, 0], //북
    [-1, -1], //서
  ];
  const dc = [
    [0, 0],
    [1, 1],
    [-1, -1],
    [0, 0],
  ];

  //가로방향으로 되어있을때 회전
  const wrdr = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const wrdc = [
    [1, 0], //오른쪽기준 아래로 회전
    [0, -1], //왼쪽기준 아래로 회전
    [1, 0], //오른쪽기준 위로 회전
    [0, -1], //왼쪽기준 위로 회전
  ];

  //세로방향으로 되어있을때 회전
  const hrdr = [
    [1, 0],
    [1, 0],
    [0, -1],
    [0, -1],
  ];
  const hrdc = [
    [1, 0], //아래 기준 오른쪽 회전
    [-1, 0], //아래 기준 왼쪽 회전
    [0, 1], //위 기준 오른쪽 회전
    [0, -1], //위 기준 왼쪽 회전
  ];

  //회전시 대각선 좌표
  const wDiagonal = [
    [1, 0],
    [1, 1],
    [-1, 0],
    [-1, 1],
  ];
  const hDiagonal = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
  ];

  visited.set("0,0,0,1", 1);
  let queue = [[0, 0, 0, 1, 0]];

  while (queue.length > 0) {
    let [r1, c1, r2, c2, count] = queue.shift();

    //작은좌표가 r1 c1으로 설정
    if ((r1 === r2 && c1 > c2) || (c1 === c2 && r1 > r2))
      [r1, c1, r2, c2] = [r2, c2, r1, c1];

    //종료조건
    if (
      (r1 === len - 1 && c1 === len - 1) ||
      (r2 === len - 1 && c2 === len - 1)
    ) {
      answer = count;
      break;
    }

    //직선 이동
    for (let i = 0; i < 4; i++) {
      const [nextR1, nextC1, nextR2, nextC2] = [
        r1 + dr[i][0],
        c1 + dc[i][0],
        r2 + dr[i][1],
        c2 + dc[i][1],
      ];
      const nextCount = count + 1;
      const key = `${nextR1},${nextC1},${nextR2},${nextC2}`;
      if (
        board[nextR1]?.[nextC1] !== 0 ||
        board[nextR2]?.[nextC2] !== 0 ||
        visited.get(key)
      )
        continue;

      visited.set(key, nextCount);
      queue.push([nextR1, nextC1, nextR2, nextC2, nextCount]);
    }

    //회전 이동
    for (let i = 0; i < 4; i++) {
      //가로로 배치되어 있을때
      let [nextR1, nextC1, nextR2, nextC2] = [
        r1 + wrdr[i][0],
        c1 + wrdc[i][0],
        r2 + wrdr[i][1],
        c2 + wrdc[i][1],
      ];
      let [diagonalR, diagonalC] = [wDiagonal[i][0], wDiagonal[i][1]];
      //세로 배치되어있을때
      if (c1 === c2) {
        [nextR1, nextC1, nextR2, nextC2] = [
          r1 + hrdr[i][0],
          c1 + hrdc[i][0],
          r2 + hrdr[i][1],
          c2 + hrdc[i][1],
        ];
        [diagonalR, diagonalC] = [hDiagonal[i][0], hDiagonal[i][1]];
      }

      const nextCount = count + 1;
      const key = `${nextR1},${nextC1},${nextR2},${nextC2}`;
      if (        
        board[nextR1]?.[nextC1] !== 0 ||
        board[nextR2]?.[nextC2] !== 0 ||
        board[r1 + diagonalR]?.[c1 + diagonalC] !== 0 ||
        visited.get(key)
      )
        continue;

      visited.set(key, nextCount);
      queue.push([nextR1, nextC1, nextR2, nextC2, nextCount]);
    }
  }
  //console.log(visited);
  return answer;
} */

function solution(board) {
  let answer = 0;
  const len = board.length;
  let visited = new Map();

  //직선 이동
  const dr = [
    [1, 1], //동
    [0, 0], //남
    [0, 0], //북
    [-1, -1], //서
  ];
  const dc = [
    [0, 0],
    [1, 1],
    [-1, -1],
    [0, 0],
  ];

  //가로방향으로 되어있을때 회전
  const wrdr = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const wrdc = [
    [1, 0], //오른쪽기준 아래로 회전
    [0, -1], //왼쪽기준 아래로 회전
    [1, 0], //오른쪽기준 위로 회전
    [0, -1], //왼쪽기준 위로 회전
  ];

  //세로방향으로 되어있을때 회전
  const hrdr = [
    [1, 0],
    [1, 0],
    [0, -1],
    [0, -1],
  ];
  const hrdc = [
    [1, 0], //아래 기준 오른쪽 회전
    [-1, 0], //아래 기준 왼쪽 회전
    [0, 1], //위 기준 오른쪽 회전
    [0, -1], //위 기준 왼쪽 회전
  ];

  //회전시 대각선 좌표
  const wDiagonal = [
    [1, 0],
    [1, 1],
    [-1, 0],
    [-1, 1],
  ];
  const hDiagonal = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
  ];

  visited.set("0,0,0,1", 1);
  let queue = [[0, 0, 0, 1, 0]];

  while (queue.length > 0) {
    let [r1, c1, r2, c2, count] = queue.shift();

    //작은좌표가 r1 c1으로 설정
    if ((r1 === r2 && c1 > c2) || (c1 === c2 && r1 > r2))
      [r1, c1, r2, c2] = [r2, c2, r1, c1];

    //종료조건
    if (
      (r1 === len - 1 && c1 === len - 1) ||
      (r2 === len - 1 && c2 === len - 1)
    ) {
      answer = count;
      break;
    }

    //직선 이동
    for (let i = 0; i < 4; i++) {
      const [nextR1, nextC1, nextR2, nextC2] = [
        r1 + dr[i][0],
        c1 + dc[i][0],
        r2 + dr[i][1],
        c2 + dc[i][1],
      ];
      const nextCount = count + 1;
      const key = `${nextR1},${nextC1},${nextR2},${nextC2}`;
      if (
        board[nextR1]?.[nextC1] !== 0 ||
        board[nextR2]?.[nextC2] !== 0 ||
        visited.get(key)
      )
        continue;

      visited.set(key, nextCount);
      queue.push([nextR1, nextC1, nextR2, nextC2, nextCount]);
    }

    //회전 이동
    for (let i = 0; i < 4; i++) {
      //가로로 배치되어 있을때
      let [nextR1, nextC1, nextR2, nextC2] = [
        r1 + wrdr[i][0],
        c1 + wrdc[i][0],
        r2 + wrdr[i][1],
        c2 + wrdc[i][1],
      ];
      let [diagonalR, diagonalC] = [wDiagonal[i][0], wDiagonal[i][1]];
      //세로 배치되어있을때
      if (c1 === c2) {
        [nextR1, nextC1, nextR2, nextC2] = [
          r1 + hrdr[i][0],
          c1 + hrdc[i][0],
          r2 + hrdr[i][1],
          c2 + hrdc[i][1],
        ];
        [diagonalR, diagonalC] = [hDiagonal[i][0], hDiagonal[i][1]];
      }

      const nextCount = count + 1;
      const key = `${nextR1},${nextC1},${nextR2},${nextC2}`;
      if (        
        board[nextR1]?.[nextC1] !== 0 ||
        board[nextR2]?.[nextC2] !== 0 ||
        board[r1 + diagonalR]?.[c1 + diagonalC] !== 0 ||
        visited.get(key)
      )
        continue;

      visited.set(key, nextCount);
      queue.push([nextR1, nextC1, nextR2, nextC2, nextCount]);
    }
  }
  //console.log(visited);
  return answer;
}

let result = solution([
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
]);
console.log(result);
