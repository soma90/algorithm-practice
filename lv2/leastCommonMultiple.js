/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12953

--- N개의 최소공배수 ---

-- 문제 설명
두 수의 최소공배수(Least Common Multiple)란 입력된 두 수의 배수 중 공통이 되는 가장 작은 숫자를 의미합니다. 
예를 들어 2와 7의 최소공배수는 14가 됩니다. 정의를 확장해서, n개의 수의 최소공배수는 n 개의 수들의 배수 중 공통이 되는 가장 작은 숫자가 됩니다. 
n개의 숫자를 담은 배열 arr이 입력되었을 때 이 수들의 최소공배수를 반환하는 함수, solution을 완성해 주세요.

-- 제한 사항
arr은 길이 1이상, 15이하인 배열입니다.
arr의 원소는 100 이하인 자연수입니다.

-- 입출력 예
arr	result
[2,6,8,14]	168
[1,2,3]	6
*/

/**
 * -- 풀이1
 * "a * b / ab의최대공약수 = 최소공배수" 가 되는 것을 이용해 입력된 배열을 순회하면서 최소공배수를 누적해서 구합니다.
 */
function solution(arr) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return arr.reduce((acc, cur) => (acc * cur) / gcd(acc, cur), 1);
}

/**
 * -- 풀이2
 * 각 수를 소인수 분해하여 소수와 지수로 저장합니다.
 * 각 수의 공통된 소수 중 지수가 높은 수들과 공통되지 않은 모든 소수의 곱하여 최소공배수를 구합니다.
 */
function solution(arr) {
  let answer = 1;
  let factors = new Map();

  for (let i = 0; i < arr.length; i++) {
    const f = new Map();
    let divisor = 2;
    let num = arr[i];
    //입력된 수들을 소인수 분해하여 저장
    while (num >= 2) {
      if (num % divisor === 0) {
        f.set(divisor, (f.get(divisor) || 0) + 1);
        num = num / divisor;
      } else {
        divisor++;
      }
    }
    //가장 큰 지수를 저장
    for (const [key, val] of f) {
      if (val > (factors.get(key) || 0)) factors.set(key, val);
    }
  }

  //최소 공배수 구하기
  for (const [key, val] of factors) {
    answer *= Math.pow(key, val);
  }

  return answer;
}

let result = solution([2, 6, 8, 14]);
console.log(result);
