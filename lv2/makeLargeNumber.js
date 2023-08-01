/* 
---큰 수 만들기---

--문제 설명
어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 
이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. 
number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

--제한 조건
number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
k는 1 이상 number의 자릿수 미만인 자연수입니다.

--입출력 예
number	k	return
"1924"	2	"94"
"1231234"	3	"3234"
"4177252841"	4	"775841"
*/
/* 
function solution(number, k) {
  let answer = [...number];

  //숫자의 앞자리 k개 숫자를 검색해 낮은 수 순서대로 제거
  for (let i = 0; i < answer.length && k > 0; i++) {
    if (k === 1) {
      const minIndex = answer[i] > answer[i + 1] ? i + 1 : i;
      answer.splice(minIndex, 1);
      console.log(minIndex);
      break;
    }

    const num = answer.slice(i, i + k);
    const max = Math.max(...num);
    const maxIndex = num.indexOf(String(max));
    answer.splice(i, maxIndex);
    k -= maxIndex;

    console.log(num.join(""), answer.join(""), k);
  }

  return answer.join("");
} */

function solution(number, k) {
  let num = [number[0]];

  for (let i = 1; i < number.length; i++) {
    //새로운 숫자보다 작은 숫자가 저장되어 있으면 작은 숫자들은 제거
    while (num.length > 0) {
      if (Number(num.at(-1)) < Number(number[i]) && k > 0) {
        num.pop();
        k--;
      } else break;
    }
    num.push(number[i]);
  }

  //제거해야할 갯수가 남으면 갯수만큼 뒷자리 숫자 제거
  if (k > 0) num.splice(-1 * k);
  return num.join("");
}

let result = solution("9929191", 5);
//let result = solution("4177252841",	4);
console.log(result);
