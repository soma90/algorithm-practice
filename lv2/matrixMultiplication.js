/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12949

--- 행렬의 곱셈 ---

-- 문제 설명
2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.

-- 제한 조건
행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
곱할 수 있는 배열만 주어집니다.

-- 입출력 예
arr1	arr2	return
[[1, 4], [3, 2], [4, 1]]	[[3, 3], [3, 3]]	[[15, 15], [15, 15], [15, 15]]
[[2, 3, 2], [4, 2, 4], [3, 1, 4]]	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]	[[22, 22, 11], [36, 28, 18], [29, 20, 14]]
*/

/**
 * -- 풀이 1
 * 첫번째 배열의 행과 두번째 배열의 열을 순회하면서 곱한 결과를 answer에 저장합니다.
 */
function solution(arr1, arr2) {
  const rowLength = arr1.length;
  const colLength = arr2[0].length;

  const answer = Array.from({ length: rowLength }, () =>
    Array.from({ length: arr2[0].length }, () => 0)
  );

  for (let col = 0; col < colLength; col++) {
    for (let row = 0; row < rowLength; row++) {
      answer[row][col] = arr1[row].reduce(
        (acc, cur, i) => acc + cur * arr2[i][col],
        0
      );
    }
  }

  return answer;
}

/**
 * -- 풀이 2
 */
function solution(arr1, arr2) {
  let answer = [];

  //두번째 배열의 행과 열 바꾸기
  let transArr2 = arr2[0].map((col, i) => arr2.map((row) => row[i]));

  //행렬 곱셈
  arr1.forEach((row) => {
    let result = [];
    transArr2.forEach((col) => {
      //행렬 곱셈 계산
      let calc = 0;
      row.forEach((el1, i) => {
        calc += el1 * col[i];
      });
      result.push(calc);
    });
    answer.push(result);
  });

  return answer;
}

let result = solution(
  [
    [2, 3, 2],
    [4, 2, 4],
    [3, 1, 4],
  ],
  [
    [5, 4],
    [2, 4],
    [3, 1],
  ]
);
console.log(result);
