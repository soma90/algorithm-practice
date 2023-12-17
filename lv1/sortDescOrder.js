/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12917

---문자열 내림차순으로 배치하기---

--문제 설명
문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

--제한 사항
str은 길이 1 이상인 문자열입니다.

--입출력 예
s	return
"Zbcdefg"	"gfedcbZ"
*/

function solution(s) {
  return quickSort(s.split("")).join("");
}

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (pivot < arr[i]) left.push(arr[i]);
    else right.push(arr[i]);
  }

  const lSorted = quickSort(left);
  const rSorted = quickSort(right);

  return [...lSorted, pivot, ...rSorted];
};

let result = solution("Zbcdefg");
console.log(result);
