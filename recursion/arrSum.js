/**
--문제
배열을 입력받아 모든 요소의 합을 리턴해야 합니다.

--입력
인자 1 : arr
number 타입을 요소로 갖는 배열
--출력
number 타입을 리턴해야 합니다.
arr[0] + arr[1] + ... + arr[n-1]
arr.length는 n
--주의 사항
함수 arrSum은 재귀함수의 형태로 작성합니다.
반복문(for, while) 사용은 금지됩니다.
입력받은 배열은 함수의 호출 뒤에도 처음 상태를 유지해야 합니다(immutability).
입력으로 들어오는 arr의 모든 요소는 정수 값을 갖는다고 가정합니다.
빈 배열의 합은 0 입니다.
--입출력 예시
let output = arrSum([-1, -2, 1, 3]);
console.log(output); // --> 1
--힌트
배열은 head와 tail을 통해 재귀적으로 정의될 수 있습니다.
head는 배열의 첫 요소를 말합니다.
tail은 배열이 head가 제거되고 남은 배열을 말합니다.
(예시) [1, 2, 3]
1) [ ] => 0
2) [3] => 3 + [ ]
3) [2, 3] => 2 + [3]
4) [1, 2, 3] => 1 + [2, 3]
3번의 [3]는 2번에 의해서 3 + [ ]로 정의되고, 따라서 [2, 3]는 최종적으로 2 + 3 + [ ] 로 정의될 수 있습니다.
같은 방식으로 4번을 정의해보세요.
길이가 1 이상인 배열 arr이 주어졌을 때 head와 tail은 각각 다음과 같이 구할 수 있습니다.
const head = arr[0];
const tail = arr.slice(1);
arrSum(arr)은 arr의 head에 arrSum(tail)을 더하는 방식으로 구할 수 있습니다.
 */

function arrSum(arr) {
  if(arr.length === 0) 
    return 0;

  return arr[0] + arrSum(arr.slice(1));
}

let output = arrSum([-1, -2, 1, 3]);
console.log(output); // --> 1