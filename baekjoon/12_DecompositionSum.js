const fs = require("fs");
const N = Number(fs.readFileSync("/dev/stdin"));

let result = 0;

for (let i = Math.ceil(N / 10); i < N; i++) {
  const sum = [i, ...String(i).split("").map(Number)].reduce(
    (acc, cur) => acc + cur,
    0
  );

  if (N === sum) {
    result = i;
    break;
  }
}

console.log(result);
