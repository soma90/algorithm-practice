/* 
--문제
문자열을 입력받아 문자열을 구성하는 각 단어의 첫 글자가 대문자인 문자열을 리턴해야 합니다.

--입력
인자 1 : str
string 타입의 공백이 있는 알파벳 문자열

--출력
string 타입을 리턴해야 합니다.

--주의 사항
단어는 공백으로 구분합니다.
연속된 공백이 존재할 수 있습니다.
빈 문자열을 입력받은 경우, 빈 문자열을 리턴해야 합니다.

--입출력 예시
let output1 = letterCapitalize('hello world');
console.log(output1); // "Hello World"
let output2 = letterCapitalize('javascript  is sexy ');
console.log(output2); // "Javascript  Is Sexy "
*/

function letterCapitalize(str) {
  const strArr = [...str];
  for(let i = 0; i < strArr.length; i++) {
    if(i === 0) {
      strArr[0] = strArr[0].toUpperCase();
    } else {
      if(strArr[i - 1] === ' '){
        strArr[i] = strArr[i].toUpperCase();
      }
    }
  }
  return strArr.join('');
}

let output1 = letterCapitalize('hello world');
console.log(output1); // "Hello World"
let output2 = letterCapitalize('javascript  is sexy ');
console.log(output2); // "Javascript  Is Sexy "