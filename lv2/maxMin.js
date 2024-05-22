/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12939

--- 최댓값과 최솟값 ---

-- 문제 설명
문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. 
str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 
반환하는 함수, solution을 완성하세요.
예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

-- 제한 조건
s에는 둘 이상의 정수가 공백으로 구분되어 있습니다.

-- 입출력 예
s	return
"1 2 3 4"	"1 4"
"-1 -2 -3 -4"	"-4 -1"
"-1 -1"	"-1 -1"
*/

/*
-- 풀이
입력된 문자열을 배열로 바꾼후 Math.min과 Math.max를 이용해 최대값과 최소값을 구합니다.
*/

function solution(s) {
  let answer = "";

  const nums = s.split(" ");
  answer += Math.min(...nums) + " ";
  answer += Math.max(...nums);

  return answer;
}

let result = solution("1 2 3 4");
console.log(result);

/* function solution(s) {
  let n = s.split(" ").map((el) => Number(el));
  let minMax = [n[0], n[0]];
  for(let i = 1; i < n.length; i++) {
    if(n[i] < minMax[0]) minMax[0] = n[i];
    if(n[i] > minMax[1]) minMax[1] = n[i];
  }

  return minMax.join(" ")
} */
