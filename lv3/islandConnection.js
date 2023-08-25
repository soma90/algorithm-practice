/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42861

---섬 연결하기---

--문제 설명
n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 
가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 
사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

--제한사항
섬의 개수 n은 1 이상 100 이하입니다.
costs의 길이는 ((n-1) * n) / 2이하입니다.
임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, 
costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 
1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 
것으로 봅니다.
연결할 수 없는 섬은 주어지지 않습니다.

--입출력 예
n	costs	return
4	[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]	4

--입출력 예 설명
costs를 그림으로 표현하면 다음과 같으며, 이때 초록색 경로로 연결하는 것이 가장 적은 비용으로 
모두를 통행할 수 있도록 만드는 방법입니다.

image.png
*/

function solution(n, costs) {
  let answer = 0;
  //각 정점의 부모를 저장. 초기값은 자신
  let root = Array.from({ length: n }, (_, i) => i);
  //union-find 함수 선언
  const find = (arr, x) => {
    if (arr[x] === x) return x;
    return (arr[x] = find(arr, arr[x]));
  };

  const union = (arr, x1, x2) => {
    const root1 = find(arr, x1);
    const root2 = find(arr, x2);

    if (root1 < root2) arr[root2] = root1;
    else arr[root1] = root2;
  };

  //costs를 비용의 오름차순으로 정렬 후 싸이클을 이루지 않는 간선들의 비용을 얻기
  costs
    .sort((a, b) => a[2] - b[2])
    .forEach((el) => {
      if (find(root, el[0]) !== find(root, el[1])) {
        union(root, el[0], el[1]);
        answer += el[2];
      }
    });

  return answer;
}

let result = solution(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]);
console.log(result);
