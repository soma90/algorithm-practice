/* 
https://school.programmers.co.kr/learn/courses/30/lessons/12913

--- 땅따먹기 ---

-- 문제 설명
땅따먹기 게임을 하려고 합니다. 땅따먹기 게임의 땅(land)은 총 N행 4열로 이루어져 있고, 모든 칸에는 점수가 쓰여 있습니다. 
1행부터 땅을 밟으며 한 행씩 내려올 때, 각 행의 4칸 중 한 칸만 밟으면서 내려와야 합니다. 단, 땅따먹기 게임에는 한 행씩 
내려올 때, 같은 열을 연속해서 밟을 수 없는 특수 규칙이 있습니다.

예를 들면,

| 1 | 2 | 3 | 5 |

| 5 | 6 | 7 | 8 |

| 4 | 3 | 2 | 1 |

로 땅이 주어졌다면, 1행에서 네번째 칸 (5)를 밟았으면, 2행의 네번째 칸 (8)은 밟을 수 없습니다.

마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 최대값을 return하는 solution 함수를 완성해 주세요. 위 예의 경우, 
1행의 네번째 칸 (5), 2행의 세번째 칸 (7), 3행의 첫번째 칸 (4) 땅을 밟아 16점이 최고점이 되므로 16을 return 하면 됩니다.

-- 제한사항
행의 개수 N : 100,000 이하의 자연수
열의 개수는 4개이고, 땅(land)은 2차원 배열로 주어집니다.
점수 : 100 이하의 자연수

-- 입출력 예
land	answer
[[1,2,3,5],[5,6,7,8],[4,3,2,1]]	16

-- 입출력 예 설명
- 입출력 예 #1
문제의 예시와 같습니다.
*/

/* 
-- 풀이
land의 각 요소를 순회하면서 같은 열을 제외한 이전 행의 최대 값을 구해서 자신의 점수와 더합니다.
land의 각 요소가 얻을 수 있는 최대값으로 업데이트 됩니다.
마지막 행의 최대값을 구하면 최고점을 구할 수 있습니다.
*/

// 풀이 1
function solution(land) {
  for (let i = 1; i < land.length; i++) {
    for (let j = 0; j < 4; j++) {
      const prev = land[i - 1];
      const slicedPrev = prev.slice(0, j).concat(prev.slice(j + 1));
      const max = Math.max(...slicedPrev);
      land[i][j] += max;
    }
  }

  return Math.max(...land.at(-1));
}

// 풀이 2
function solution(land) {
  let [prevFirst, prevSecond] = [0, -1];
  let [currFirst, currSecond] = [0, -1];
  for (let i = 0; i < land.length; i++) {
    [currFirst, currSecond] = [0, -1];
    for (let j = 0; j < land[0].length; j++) {
      //이전행에서 선택할수 있는 최대값
      let prevMax = 0;
      if (i > 0) {
        prevMax =
          j === prevFirst ? land[i - 1][prevSecond] : land[i - 1][prevFirst];
      }
      //현재행에 최대값 더하기
      land[i][j] += prevMax;
      //현재행에 최대값과 두번째값 업데이트
      if (land[i][j] > land[i][currFirst]) {
        currSecond = currFirst;
        currFirst = j;
      } else if (currSecond === -1 || land[i][j] > land[i][currSecond]) {
        if (j !== currFirst) currSecond = j;
      }
    }
    //이전행 최대값 두번째값 업데이트
    [prevFirst, prevSecond] = [currFirst, currSecond];
  }
  // console.log(land);
  return land.at(-1)[currFirst];
}

let result = solution([
  [1, 2, 3, 5],
  [5, 6, 7, 8],
  [4, 3, 2, 1],
]);
console.log(result);
