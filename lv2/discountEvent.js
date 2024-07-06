/* 
https://school.programmers.co.kr/learn/courses/30/lessons/131127

--- 할인 행사 ---

-- 문제 설명
XYZ 마트는 일정한 금액을 지불하면 10일 동안 회원 자격을 부여합니다. XYZ 마트에서는 회원을 대상으로 매일 한 가지 제품을 할인하는 행사를 합니다. 
할인하는 제품은 하루에 하나씩만 구매할 수 있습니다. 알뜰한 정현이는 자신이 원하는 제품과 수량이 할인하는 날짜와 10일 연속으로 일치할 경우에 맞춰서 회원가입을 하려 합니다.

예를 들어, 정현이가 원하는 제품이 바나나 3개, 사과 2개, 쌀 2개, 돼지고기 2개, 냄비 1개이며, 
XYZ 마트에서 15일간 회원을 대상으로 할인하는 제품이 날짜 순서대로 치킨, 사과, 사과, 바나나, 쌀, 사과, 돼지고기, 바나나, 돼지고기, 쌀, 냄비, 바나나, 사과, 바나나인 경우에 대해 알아봅시다. 
첫째 날부터 열흘 간에는 냄비가 할인하지 않기 때문에 첫째 날에는 회원가입을 하지 않습니다. 
둘째 날부터 열흘 간에는 바나나를 원하는 만큼 할인구매할 수 없기 때문에 둘째 날에도 회원가입을 하지 않습니다. 
셋째 날, 넷째 날, 다섯째 날부터 각각 열흘은 원하는 제품과 수량이 일치하기 때문에 셋 중 하루에 회원가입을 하려 합니다.

정현이가 원하는 제품을 나타내는 문자열 배열 want와 정현이가 원하는 제품의 수량을 나타내는 정수 배열 number, 
XYZ 마트에서 할인하는 제품을 나타내는 문자열 배열 discount가 주어졌을 때, 
회원등록시 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원등록 날짜의 총 일수를 return 하는 solution 함수를 완성하시오. 
가능한 날이 없으면 0을 return 합니다.

-- 제한사항
1 ≤ want의 길이 = number의 길이 ≤ 10
1 ≤ number의 원소 ≤ 10
number[i]는 want[i]의 수량을 의미하며, number의 원소의 합은 10입니다.
10 ≤ discount의 길이 ≤ 100,000
want와 discount의 원소들은 알파벳 소문자로 이루어진 문자열입니다.
1 ≤ want의 원소의 길이, discount의 원소의 길이 ≤ 12

-- 입출력 예
want	number	discount	result
["banana", "apple", "rice", "pork", "pot"]	[3, 2, 2, 2, 1]	["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]	3
["apple"]	[10]	["banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana"]	0

-- 입출력 예 설명
- 입출력 예 #1
문제 예시와 같습니다.

- 입출력 예 #2
사과가 할인하는 날이 없으므로 0을 return 합니다.
*/

/**
 * -- 풀이 1
 * 처음 10일간 할인하는 제품 수량 정보를 맵에 저장합니다
 * 처음 날짜부터 순회하여 날짜별로 원하는 물품을 구매할 수 있는지 확인합니다.
 * 해당 날짜 확인이 끝나면 맵에 저장되어 있는 수량 정보에서 오늘 제품 수량을 감소시키고 10일뒤 제품 수량을 증가시킵니다.
 */
function solution(want, number, discount) {
  let answer = discount.length;
  const discountMap = new Map();

  // 처음 10일 할인 제품 정보 저장
  for (let i = 0; i < 10; i++) {
    const product = discount[i];
    discountMap.set(product, (discountMap.get(product) || 0) + 1);
  }

  for (let i = 0; i < discount.length; i++) {
    // 날짜별로 원하는 물품을 구매할 수 있는지 확인
    for (let j = 0; j < want.length; j++) {
      const productAmount = discountMap.get(want[j]) || 0;
      if (productAmount < number[j]) {
        answer--;
        break;
      }
    }

    // 오늘 날짜 물품 수량감소와 10일뒤 물품 수량 추가
    discountMap.set(discount[i], discountMap.get(discount[i]) - 1);
    if (i + 10 < discount.length) {
      discountMap.set(
        discount[i + 10],
        (discountMap.get(discount[i + 10]) || 0) + 1
      );
    }
  }

  return answer;
}

/**
 * -- 풀이 2
 */
function solution(want, number, discount) {
  let answer = 0;

  //처음 10개에서 회원가입 가능한지 확인
  for (let i = 0; i < 10; i++) {
    const index = want.indexOf(discount[i]);
    if (index !== -1) number[index]--;
    if (number.every((item) => item <= 0)) answer++;
  }
  //두번째 부터 10개에서 회원가입 가능한지 확인
  for (let i = 1; i <= discount.length - 10; i++) {
    const fIndex = want.indexOf(discount[i - 1]);
    const lIndex = want.indexOf(discount[i + 9]);
    if (fIndex !== -1) number[fIndex]++;
    if (lIndex !== -1) number[lIndex]--;
    if (number.every((item) => item <= 0)) answer++;
  }

  return answer;
}

let result = solution(
  ["banana", "apple", "rice", "pork", "pot"],
  [3, 2, 2, 2, 1],
  [
    "chicken",
    "apple",
    "apple",
    "banana",
    "rice",
    "apple",
    "pork",
    "banana",
    "pork",
    "rice", //10
    "pot",
    "banana",
    "apple",
    "banana",
  ]
);
console.log(result);
