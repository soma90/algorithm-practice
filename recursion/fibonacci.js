/**
--문제
수(num)를 입력받아 피보나치 수열의 num번째 요소를 리턴해야 합니다.

0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1입니다. 그 다음 2번째 피보나치 수부터는 바로 직전의 두 피보나치 수의 합으로 정의합니다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

--입력
인자 1 : num
number 타입의 num (num은 0 이상 15 이하의 정수)
--출력
number 타입을 리턴해야 합니다. (num 번째 피보나치 수)
--주의 사항
함수 fibonacci는 재귀함수의 형태로 작성합니다.
반복문(for, while) 사용은 금지됩니다.
피보나치 수열은 0번부터 시작합니다.
--입출력 예시
let output = fibonacci(5);
console.log(output); // --> 5

output = fibonacci(9);
console.log(output); // --> 34
 */

function fibonacci(num) {
  if(num <= 1) 
    return num;
  return fibonacci(num - 2) + fibonacci(num - 1);
}

output = fibonacci(9);
console.log(output); // --> 34