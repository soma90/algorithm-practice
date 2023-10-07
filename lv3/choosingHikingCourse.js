/* 보류 다익스트라 이용? */

function solution(n, paths, gates, summits) {
  let answer = [];
  let intensity = Infinity;
  let visited = Array.from({ length: n + 1 }, () => Infinity);
  let pathsMap = new Map();
  let gatesMap = new Map();
  let summitsMap = new Map();

  //paths gates summits map으로 저장
  for (const path of paths) {
    pathsMap.set(path[0], [
      ...(pathsMap.get(path[0]) || []),
      [path[1], path[2]],
    ]);
    pathsMap.set(path[1], [
      ...(pathsMap.get(path[1]) || []),
      [path[0], path[2]],
    ]);
  }
  for (const gate of gates) {
    gatesMap.set(gate, true);
  }
  for (const summit of summits) {
    summitsMap.set(summit, true);
  }

  //path intensity순으로 정렬
  for (let [key, val] of pathsMap) {
    pathsMap.set(
      key,
      val.sort((a, b) => a[1] - b[1])
    );
  }

  //dfs를이용해 등산로 찾기
  let dfs = (point, minIntensity = 0) => {
    if (summitsMap.get(point)) {
      intensity = Math.min(intensity, minIntensity);
      answer.push([point, minIntensity]);
      return;
    }

    for (let [nextPoint, itsity] of pathsMap.get(point)) {
      let nextMinItsity = Math.max(minIntensity, itsity);
      if (
        itsity > intensity ||
        visited[nextPoint] <= nextMinItsity ||
        gatesMap.get(nextPoint)
      )
        continue;
      visited[nextPoint] = nextMinItsity;

      dfs(nextPoint, nextMinItsity);
    }
  };

  //시작지점부터 등산로 찾기
  for (const gate of gates) {
    visited[gate] = 0;
    dfs(gate);
  }

  return answer.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  })[0];
}

let result = solution(
  7,
  [
    [1, 4, 4],
    [1, 6, 1],
    [1, 7, 3],
    [2, 5, 2],
    [3, 7, 4],
    [5, 6, 6],
  ],
  [1],
  [2, 3, 4]
);
console.log(result);
