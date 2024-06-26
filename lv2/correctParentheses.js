/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12909

--- 올바른 괄호 ---

-- 문제 설명
괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

"()()" 또는 "(())()" 는 올바른 괄호입니다.
")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
'(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고,
올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

-- 제한사항
문자열 s의 길이 : 100,000 이하의 자연수
문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

-- 입출력 예
s	answer
"()()"	true
"(())()"	true
")()("	false
"(()("	false

-- 입출력 예 설명
입출력 예 #1,2,3,4
문제의 예시와 같습니다.
*/

/*
-- 풀이
"(" 일경우에는 스택에 저장하고 아닐경우는 stack 에서 "(" 를 하나 제거합니다.
만일 제거할 "(" 이 없으면 괄호의 짝이 안맞으므로 false를 리턴합니다.
모든 검사가 끝난 후 stack 에 "(" 남아 있으면 괄호의 짝이 안맞는 것이므로 false를 리턴합니다.
stack이 비어 있다면 모든 괄호에 짝이 있는 것이므로 true를 리턴합니다.
*/

function solution(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") stack.push("(");
    else if (s[i] === ")") if (!stack.pop()) return false;
  }

  return stack.length === 0 ? true : false;
}

let result = solution(")()(");
console.log(result);
