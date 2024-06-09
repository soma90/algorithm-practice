/* 
https://school.programmers.co.kr/learn/courses/30/lessons/77885

--- 2개 이하로 다른 비트 ---
-- 문제 설명
양의 정수 x에 대한 함수 f(x)를 다음과 같이 정의합니다.

x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
예를 들어,

f(2) = 3 입니다. 다음 표와 같이 2보다 큰 수들 중에서 비트가 다른 지점이 2개 이하이면서 제일 
작은 수가 3이기 때문입니다.
수	비트	다른 비트의 개수
2	000...0010	
3	000...0011	1
f(7) = 11 입니다. 다음 표와 같이 7보다 큰 수들 중에서 비트가 다른 지점이 2개 이하이면서 제일 
작은 수가 11이기 때문입니다.
수	비트	다른 비트의 개수
7	000...0111	
8	000...1000	4
9	000...1001	3
10	000...1010	3
11	000...1011	2
정수들이 담긴 배열 numbers가 매개변수로 주어집니다. numbers의 모든 수들에 대하여 각 수의 
f 값을 배열에 차례대로 담아 return 하도록 solution 함수를 완성해주세요.

-- 제한사항
1 ≤ numbers의 길이 ≤ 100,000
0 ≤ numbers의 모든 수 ≤ 1015

-- 입출력 예
numbers	result
[2,7]	[3,11]

-- 입출력 예 설명
- 입출력 예 #1
문제 예시와 같습니다.
*/

/**
 * -- 풀이
 * 짝수일때는 2진수의 마지막 숫자가 0이므로 +1은 2개이하로 다른 비트 수 입니다.
 * 홀수 일때는 가장 빨리 나오는 0을 1로 증가시키고 그 이전자리의 수를 0으로 바꾸면
 * 2개이하이면서 제일작은 수가 됩니다.
 */
function solution(numbers) {
  return numbers.map((n) => {
    if (n % 2 === 0) return n + 1;
    const binary = "0" + n.toString(2);
    const index = binary.lastIndexOf("0");
    const nextBinary = binary.slice(0, index) + "10" + binary.slice(index + 2);
    return parseInt(nextBinary, 2);
  });
}

let result = solution([2, 7]);
console.log(result);
