/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42842

--- 카펫 ---

-- 문제 설명
Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 노란색으로 칠해져 있고 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.

carpet.png

Leo는 집으로 돌아와서 아까 본 카펫의 노란색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.

Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때 
카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

-- 제한사항
갈색 격자의 수 brown은 8 이상 5,000 이하인 자연수입니다.
노란색 격자의 수 yellow는 1 이상 2,000,000 이하인 자연수입니다.
카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.

-- 입출력 예
brown	yellow	return
10	2	[4, 3]
8	1	[3, 3]
24	24	[8, 6]
*/

/**
 * brown과 yellow의 합인 전체 타일의 수에 대한 약수 집합에 대해 가장 큰수와 가장 작은수의 곱은 
 * 전체 타일의 가로와 세로에 대한 곱이 됩니다.
 * w >= h 인 조건 이므로 약수를 구한 후  가장 큰수를 가로 w, 가장 작은수를 h로 설정해서 순회 합니다.
 * 약수는 홀수 갯수가 될 수 있으므로 h가 undefined이 된다면 w와 같게 설정 합니다.
 * (w - 2) * (h - 2) 는 가운데를 채우는 수를 나타내므로 yellow 의 갯수와 같다면 해당 w, h 는 답이 됩니다. 
 */
function solution(brown, yellow) {
  let answer = [];
  let divisors = [];
  //약수 구하기
  for (let i = 1; i <= brown + yellow; i++) {
    if ((brown + yellow) % i === 0) {
      divisors.push(i);
    }
  }

  //카펫크기 구하기
  while (divisors.length > 0) {
    let w = divisors.pop();
    let h = divisors.shift();
    if(!h) h = w;

    if ((w - 2) * (h - 2) === yellow) {
      answer = [w, h];
      break;
    }
  }

  return answer;
}

let result = solution(24, 24);
console.log(result);
