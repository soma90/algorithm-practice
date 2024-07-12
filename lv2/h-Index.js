/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42747

--- H-Index ---

-- 문제 설명
H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

-- 제한사항
과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

-- 입출력 예
citations	return
[3, 0, 6, 1, 5]	3

-- 입출력 예 설명
이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.
*/

/**
 * -- 풀이 1
 * 논문의 인용 배열을 내림차순으로 정렬합니다.
 * 각 배열의 값은 해당 논문의 인용된 수를 의미 하고 h라 칭합니다.
 * 배열을 내림차순으로 정렬 했으므로 배열의 인덱스 i는 h값 이상으로 인용된 논문의 갯수를 의미합니다.
 * 따라서 h > i 가 되는 i 의 최대값을 구해 i + 1을 H-Index로 구할 수 있습니다.
 */
function solution(citations) {
  let answer = 0;
  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    const h = citations[i];
    if (h > i) answer = i + 1;
  }

  return answer;
}

/**
 * -- 풀이 2
 */
function solution(citations) {
  let answer = 0;
  citations.sort((a, b) => a - b);

  for (let i = 1; i <= citations.length; i++) {
    let count = 0;
    for (let j = 0; j < citations.length; j++) {
      if (citations[j] >= i) count++;
      if (count >= i) {
        answer = i;
        break;
      }
    }
  }

  return Math.max(...answer);
}

let result = solution([0, 0, 0]);
console.log(result);
