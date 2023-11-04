function solution(n) {
  let isPrime = Array.from({ length: n + 1 }, () => true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i <= n; i++) {
    //현재 숫자가 소수가 아니면 다음 숫자 확인
    if (isPrime[i] === false) continue;

    //소수인지 확인
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime[i] = false;
        //찾은 소수가 아닌수의 배수 지우기
        for (let k = j + j; k <= n; k += j) {
          isPrime[k] = false;
        }
        break;
      }
    }
  }

  return isPrime.filter(el => el).length;
}

let result = solution(5);
console.log(result);
