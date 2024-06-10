/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42839

--- 소수 찾기 ---

-- 문제 설명
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 
흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 
종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

-- 제한사항
numbers는 길이 1 이상 7 이하인 문자열입니다.
numbers는 0~9까지 숫자만으로 이루어져 있습니다.
"013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

-- 입출력 예
numbers	return
"17"	3
"011"	2

-- 입출력 예 설명
예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.
*/

/**
 * -- 풀이 1
 * 입력된 숫자에 모든 가능한 숫자 조합을 재귀적으로 생성합니다.
 * 생성된 수를 소수 검사하고 중복되지 않도록 Set에 저장합니다.
 * 저장된 Set의 개수, 만들수 있는 소수의 갯수를 반환합니다.
 */
function solution(numbers) {
  const answer = new Set();
  const numbersArray = numbers.split("");

  const isPrimeNumber = (num) => {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const combination = (selectedIndex = [], selected = []) => {
    const number = Number(selected.join(""));

    if (isPrimeNumber(number)) {
      answer.add(number);
    }

    if (selected.length === numbersArray.length) {
      return;
    }

    for (let i = 0; i < numbersArray.length; i++) {
      if (selectedIndex.includes(i)) continue;
      combination([...selectedIndex, i], [...selected, numbersArray[i]]);
    }
  };

  combination();

  return answer.size;
}

/**
 * -- 풀이 2
 */
function solution(numbers) {
  let primes = new Set();

  //소수 판별
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  //만들 수 있는 모든 소수 찾기
  const getPrimes = (now, len, nums) => {
    if (len > numbers.length) return;
    if (isPrime(now)) primes.add(now);

    for (let i = 0; i < nums.length; i++) {
      const next = now + nums[i];
      const nextNums = nums.slice(0, i) + nums.slice(i + 1);
      getPrimes(Number(next), len + 1, nextNums);
    }
  };

  getPrimes(0, 0, numbers);
  return primes.size;
}

let result = solution("011");
console.log(result);
