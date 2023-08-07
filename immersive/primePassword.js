/* 
---primePassword---

--문제
다음의 조건을 만족하면서 현재의 비밀번호('curPwd')를 새 비밀번호(newPwd)로 변경하는 데 
필요한 최소 동작의 수를 리턴해야 합니다.

한 번에 한 개의 숫자만 변경가능하다.
4자리의 소수(prime)인 비밀번호로만 변경가능하다.
정리하면, 비밀번호가 계속 소수를 유지하도록 숫자 한 개씩을 바꿔갈 때 현재 비밀번호에서 
새 비밀번호로 바꾸는 데 최소 몇 개의 숫자를 변경해야 하는지를 리턴해야 합니다.

--입력
인자 1 : curPwd
number 타입의 1,000 이상 9,999 이하의 자연수
인자 2 : newPwd
number 타입의 1,000 이상 9,999 이하의 자연수
출력
number 타입을 리턴해야 합니다.

--주의사항
4자리인 소수는 1,000 이상의 소수를 말합니다.(0011, 0997 등은 제외)

--입출력 예시
let output = primePassword(1033, 1033);
console.log(output); // --> 0

output = primePassword(3733, 8779);
console.log(output); // --> 3 (3733 -> 3739 -> 3779 -> 8779)
*/

const primePassword = (curPwd, newPwd) => {
  let answer = 0;
  let needVisit = [[String(curPwd), 0]];
  let visited = [String(curPwd)];

  while (needVisit.length > 0) {
    const [pwd, c] = needVisit.shift();
    if (Number(pwd) === Number(newPwd)) {
      answer = c;
      break;
    }

    for (let i = 0; i < pwd.length; i++) {
      for (let j = 0; j < 10; j++) {
        let arrPwd = String(pwd).split("");
        arrPwd[i] = j;
        let strPwd = arrPwd.join("");

        if (
          arrPwd[0] !== 0 &&
          isPrime(Number(strPwd)) &&
          !visited.includes(strPwd)
        ) {
          visited.push(strPwd);
          needVisit.push([strPwd, c + 1]);
        }
      }
    }
  }
  return answer;
};

function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

let output = primePassword(1033, 1033);
console.log(output); // --> 0

output = primePassword(3733, 8779);
console.log(output); // --> 3 (3733 -> 3739 -> 3779 -> 8779)

output = primePassword(1009, 1171);
console.log(output); // --> 5 ()
