function solution(arr1, arr2) {
  return arr1.map((_, row) =>
    arr1[row].map((_, col) => arr1[row][col] + arr2[row][col])
  );
}

let result = solution(
  [
    [1, 2],
    [2, 3],
  ],
  [
    [3, 4],
    [5, 6],
  ]
);
console.log(result);
