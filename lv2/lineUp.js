/*
---줄 서는 방법---

--문제 설명
n명의 사람이 일렬로 줄을 서고 있습니다. n명의 사람들에게는 각각 1번부터 n번까지 번호가 매겨져 있습니다. 
n명이 사람을 줄을 서는 방법은 여러가지 방법이 있습니다. 예를 들어서 3명의 사람이 있다면 다음과 같이 6개의 방법이 있습니다.

[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
사람의 수 n과, 자연수 k가 주어질 때, 사람을 나열 하는 방법을 사전 순으로 나열 했을 때, 
k번째 방법을 return하는 solution 함수를 완성해주세요.

--제한사항
n은 20이하의 자연수 입니다.
k는 n! 이하의 자연수 입니다.

--입출력 예
n	k	result
3	5	[3,1,2]

--입출력 예시 설명
입출력 예 #1
문제의 예시와 같습니다.
*/

function solution(n, k) {
  let answer = [];
  let nArr = [...Array(n + 1).keys()].slice(1);
  const factorial = (n) => {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  for (let i = 0; i < n; i++) {
    const index = Math.floor((k - 1) / factorial(nArr.length - 1));
    k = ((k - 1) % factorial(nArr.length - 1)) + 1;
    answer.push(nArr[index]);
    nArr.splice(index, 1);
  }
  return answer;
}

/* 
//모든 조합 구하기, n이 커지면 에러와 느려짐
function solution(n, k) {
  var answer = [];

  const dfs = (next, visited = []) => {
    if (visited.length === n) {
      answer.push([...visited]);
      return;
    }
    for (let i = 0; i < next.length; i++) {
      if (answer.length === k) return;
      if (!visited.includes(next[i])) {
        visited.push(next[i]);
        dfs([...next.slice(0, i), ...next.slice(i + 1)], visited);
        visited.pop();
      }
    }
  };

  dfs([...Array(n + 1).keys()].slice(1));
  return answer.at(-1);
} 
*/

let result = solution(3, 6);
console.log(result);
