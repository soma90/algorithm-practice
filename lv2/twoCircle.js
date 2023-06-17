/* 
--문제 설명
x축과 y축으로 이루어진 2차원 직교 좌표계에 중심이 원점인 서로 다른 크기의 원이 두 개 주어집니다. 
반지름을 나타내는 두 정수 r1, r2가 매개변수로 주어질 때, 
두 원 사이의 공간에 x좌표와 y좌표가 모두 정수인 점의 개수를 return하도록 solution 함수를 완성해주세요.
※ 각 원 위의 점도 포함하여 셉니다.

--제한 사항
1 ≤ r1 < r2 ≤ 1,000,000

--입출력 예
r1	r2	result
2	3	20
*/

function twoCircle(r1, r2) {
  let answer = 0;

  for (let x = 1; x <= r2; x++) {
    const y1 = Math.sqrt(r1 * r1 - x * x > 0 ? r1 * r1 - x * x : 0);
    const y2 = Math.sqrt(r2 * r2 - x * x);
    answer += Math.floor(y2) - Math.ceil(y1) + 1;
    //console.log(y1, y2, answer);
  }

  return answer * 4;
}

const result = twoCircle(2, 3);
console.log(result);
