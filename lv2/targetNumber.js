/* 
https://school.programmers.co.kr/learn/courses/30/lessons/43165

--- 타겟 넘버 ---

-- 문제 설명
n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 
예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 
숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

-- 제한사항
주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
각 숫자는 1 이상 50 이하인 자연수입니다.
타겟 넘버는 1 이상 1000 이하인 자연수입니다.

-- 입출력 예
numbers	target	return
[1, 1, 1, 1, 1]	3	5
[4, 1, 2, 1]	4	2

-- 입출력 예 설명
- 입출력 예 #1
문제 예시와 같습니다.

- 입출력 예 #2
+4+1-2+1 = 4
+4-1+2-1 = 4
총 2가지 방법이 있으므로, 2를 return 합니다.
*/

/**
 * -- 풀이 1
 * 각 숫자에 대해 +- 두 가지의 경우에 대해 계산해야 하므로 재귀를 이용해 계산합니다.
 * index가 numbers 배열의 길이와 같고 계산한 값이 target값이 되면 answer를 1 증가 시킵니다.
 */
function solution(numbers, target) {
  let answer = 0;

  const getTargetNumber = (index, sum) => {
    if (index > numbers.length) return;
    if (index === numbers.length && sum === target) {
      answer++;
      return;
    }

    getTargetNumber(index + 1, sum + numbers[index]);
    getTargetNumber(index + 1, sum + numbers[index] * -1);
  };

  getTargetNumber(0, 0);

  return answer;
}

let result = solution([4, 1, 2, 1], 4);
console.log(result);

/**
 * -- 풀이 2
 */
function solution2(numbers, target) {
  let answer = [];
  let sign = new Array(numbers.length).fill(0);

  const dfs = (index) => {
    if (index === numbers.length) {
      let sum = numbers.reduce((acc, cur, i) => acc + cur * sign[i], 0);
      if (sum === target) answer.push([...sign]);
      return;
    }

    sign[index] = -1;
    dfs(index + 1);
    sign[index] = 1;
    dfs(index + 1);
  };

  dfs(0);

  return answer;
}

let result2 = solution2([4, 1, 2, 1], 4);
console.log(result2);
