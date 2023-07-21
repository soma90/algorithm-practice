/* 
---삼각 달팽이---
--문제 설명
정수 n이 매개변수로 주어집니다. 다음 그림과 같이 밑변의 길이와 높이가 n인 삼각형에서 맨 위 꼭짓점부터 반시계 방향으로 달팽이 채우기를 진행한 후, 
첫 행부터 마지막 행까지 모두 순서대로 합친 새로운 배열을 return 하도록 solution 함수를 완성해주세요.

examples.png

--제한사항
n은 1 이상 1,000 이하입니다.

--입출력 예
n	result
4	[1,2,9,3,10,8,4,5,6,7]
5	[1,2,12,3,13,11,4,14,15,10,5,6,7,8,9]
6	[1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]

--입출력 예 설명
입출력 예 #1
문제 예시와 같습니다.

입출력 예 #2
문제 예시와 같습니다.

입출력 예 #3
문제 예시와 같습니다.
*/

function solution(n) {
  if (n === 1) return [1];
  let answer = Array.from({ length: n }, (_, i) =>
    Array.from({ length: i + 1 })
  );

  //달팽이 채우기 진행 후 재귀호출로 내부 달팽이 채우기
  const triangularSnail = (_n, _startI = [0, 0], _startN = 0) => {
    if (_n <= 0) return;
    for (let i = 0; i < _n; i++) {
      answer[_startI[0] + i][_startI[1] + i] =
        _startN + (_n + _n - 1) + (_n - 1 - i); //각행의 마지막
      answer[_startI[0] + i][_startI[1]] = _startN + i + 1; //각행의 첫번째
      //마지막줄
      if (i === _n - 1) {
        for (let j = 1; j < i; j++) {
          answer[_startI[0] + i][_startI[1] + j] = _startN + _n + j;
        }
      }
    }

    triangularSnail(
      _n - 3,
      [_startI[0] + 2, _startI[1] + 1],
      answer[_startI[0] + 1][_startI[1] + 1]
    );
  };

  triangularSnail(n);

  return answer.flat();
}

/*   for (let i = 0; i < n; i++) {
  let arr = new Array(i + 1);
  arr[arr.length - 1] = n + n - 1 + (n - 1 - i);
  arr[0] = i + 1;
  if (i === n - 1) {
    for (let j = 1; j < i; j++) {
      arr[j] = n + j;
    }
  }
  console.log(arr);
} */

let result = solution(5);
console.log(result);
