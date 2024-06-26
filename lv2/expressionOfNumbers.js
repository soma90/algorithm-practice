/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12924

--- 숫자의 표현 ---

-- 문제 설명
Finn은 요즘 수학공부에 빠져 있습니다. 
수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다. 
예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.

1 + 2 + 3 + 4 + 5 = 15
4 + 5 + 6 = 15
7 + 8 = 15
15 = 15
자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.

-- 제한사항
n은 10,000 이하의 자연수 입니다.

-- 입출력 예
n	result
15	4
입출력 예 설명
입출력 예#1
문제의 예시와 같습니다.
*/

/**
 * -- 풀이
 * 자신의 수는 입력된 수이므로 answer를 1로 설정합니다.
 * 1부터 증가 시키면서 누적합이 n 이 되는 경우를 탐색합니다.
 * (n / 2)  + (n / 2 + 1) 가 누적힙이 n 이 될 수 있는 최대 수이므로 n /2 + 1 까지 탐색합니다.
 */
function solution(n) {
  let answer = 1;
  const max = n / 2 + 1;

  for (let i = 1; i <= max; i++) {
    let sum = i;
    for (let j = i + 1; j <= max && sum < n; j++) {      
      sum += j;
      if (sum === n) {
        console.log(i, j);
        answer++;
        break;
      }      
    }
  }
  return answer;
}

let result = solution(15);
console.log(result);
