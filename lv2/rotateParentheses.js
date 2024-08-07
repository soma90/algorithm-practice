/* 
https://school.programmers.co.kr/learn/courses/30/lessons/76502

--- 괄호 회전하기 ---

-- 문제 설명
다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.

(), [], {} 는 모두 올바른 괄호 문자열입니다.
만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다. 예를 들어, [] 가 올바른 괄호 문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
만약 A, B가 올바른 괄호 문자열이라면, AB 도 올바른 괄호 문자열입니다. 예를 들어, {} 와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.
대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 
이 s를 왼쪽으로 x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.

-- 제한사항
s의 길이는 1 이상 1,000 이하입니다.

-- 입출력 예
s	result
"[](){}"	3
"}]()[{"	2
"[)(]"	0
"}}}"	0

-- 입출력 예 설명
- 입출력 예 #1
다음 표는 "[](){}" 를 회전시킨 모습을 나타낸 것입니다.
x	s를 왼쪽으로 x칸만큼 회전	올바른 괄호 문자열?
0	"[](){}"	O
1	"](){}["	X
2	"(){}[]"	O
3	"){}[]("	X
4	"{}[]()"	O
5	"}[](){"	X
올바른 괄호 문자열이 되는 x가 3개이므로, 3을 return 해야 합니다.

- 입출력 예 #2
다음 표는 "}]()[{" 를 회전시킨 모습을 나타낸 것입니다.
x	s를 왼쪽으로 x칸만큼 회전	올바른 괄호 문자열?
0	"}]()[{"	X
1	"]()[{}"	X
2	"()[{}]"	O
3	")[{}]("	X
4	"[{}]()"	O
5	"{}]()["	X
올바른 괄호 문자열이 되는 x가 2개이므로, 2를 return 해야 합니다.

- 입출력 예 #3
s를 어떻게 회전하더라도 올바른 괄호 문자열을 만들 수 없으므로, 0을 return 해야 합니다.

- 입출력 예 #4

s를 어떻게 회전하더라도 올바른 괄호 문자열을 만들 수 없으므로, 0을 return 해야 합니다.
*/

/**
 * -- 풀이 1
 * 왼쪽으로 순회하면서 옳바른 괄호 문자열인지 체크해야 하므로 문자열의 0번부터 마지막까지
 * 시작점으로 반복문을 수행 합니다. 왼쪽 괄호일 경우 스택에 저장하고 오른쪽 괄호 일경우는
 * 스택에 마지막 저장된 문자열이 짝 괄호인지 확인해서 옳바른 괄호인지 검사합니다.
 * 문자열 0번부터 마지막까지 시작점으로 검사를 하고 옳바른 괄호의 문자열의 갯수를 리턴합니다.
 */
function solution(s) {
  let answer = 0;
  const bracketMap = new Map([
    ["[", ["left", "]"]],
    ["]", ["right", "["]],
    ["(", ["left", ")"]],
    [")", ["right", "("]],
    ["{", ["left", "}"]],
    ["}", ["right", "{"]],
  ]);

  for (let i = 0; i < s.length; i++) {
    const stack = [];
    let isCorrect = true;

    for (let j = 0; j < s.length; j++) {
      const index = (i + j) % s.length;
      const [dir, pair] = bracketMap.get(s[index]);

      if (dir === "left") stack.push(s[index]);
      else {
        if (stack.pop() !== pair) {
          isCorrect = false;
          break;
        }
      }
    }

    if (stack.length === 0 && isCorrect) answer++;
  }

  return answer;
}

/**
 * -- 풀이 2
 */
function solution(s) {
  let answer = 0;
  let lp = "[({";
  let rp = "])}";
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let make = true;
    for (let j = 0; j < s.length; j++) {
      const p = s[(i + j) % s.length];
      if (lp.indexOf(p) !== -1) {
        stack.push(p);
      } else if (rp.indexOf(p) !== -1) {
        const lastP = stack.pop();
        if (lastP !== lp[rp.indexOf(p)]) {
          make = false;
          break;
        }
      }
    }
    if (make && stack.length === 0) answer++;
  }

  return answer;
}

let result = solution("}]()[{");
console.log(result);
