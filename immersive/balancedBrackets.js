/**
--문제
문자열을 입력받아 문자열 내의 모든 괄호의 짝이 맞는지 여부를 리턴해야 합니다.

다음 단계에 맞춰 함수를 작성해 보세요
괄호의 종류를 단 한가지로 한정합니다.
괄호의 종류를 늘려 모든 종류의 괄호에도 작동하도록 합니다.
괄호를 제외한 문자열이 포함된 경우에도 작동하도록 합니다.

--입력
인자 1 : str
string 타입의 괄호가 포함된 문자열

--출력
boolean 타입을 리턴해야 합니다.

--주의사항
괄호의 종류는 (, )만 고려합니다.
괄호는 먼저 열리고((), 열린만큼만 닫혀야()) 합니다.
빈 문자열을 입력받은 경우, true를 리턴해야 합니다.

--입출력 예시
let output = balancedBrackets('(');
console.log(output); // // -> false

output = balancedBrackets('()');
console.log(output); // --> true

--Advanced
모든 종류의 괄호((, ), {, }, [, ])가 포함된 문자열을 입력빋아 모든 괄호의 짝이 맞는지 여부를 리턴해 보세요.

let output = balancedBrackets('[](){}');
console.log(output); // --> true

output = balancedBrackets('[({})]');
console.log(output); // --> true

let output3 = balancedBrackets('[(]{)}');
console.log(output); // --> false
 */


// 기본 solution
// const balancedBrackets = function (str) {
//   // TODO: 여기에 코드를 작성합니다.  
//   if(str === '') 
//     return true;
//
//   const brackets = [str[0]];
//   for(let i = 1; i < str.length; i++) {
//     if(str[i] === '(') {
//       brackets.push(str[i]);
//     } else if(str[i] === ')') {
//       //이전에 열린 괄호가 없으면 종료
//       if(brackets[brackets.length - 1] !== '(') {
//         return false;
//       } else { //열린 괄호가 있으면 열린 괄호 제거
//         brackets.pop();
//       }
//     }
//     console.log(brackets);
//   }
//   let result = true;
//   if(brackets.length !== 0) 
//     result = false;
//   return result;
// };

const balancedBrackets = function (str) {
  // TODO: 여기에 코드를 작성합니다.  
  if(str === '') 
    return true;

  const openBracketList = ['(', '{', '[']; //검사할 열린 괄호 리스트
  const closeBracketList = [')', '}', ']']; //검사할 닫힌 괄호 리스트
  const brackets = [str[0]]; //열린 괄호 저장
  for(let i = 1; i < str.length; i++) {
    const openBracketIndex = openBracketList.indexOf(str[i]);
    const closeBracketIndex = closeBracketList.indexOf(str[i]);
    //열린 괄호일경우
    if(openBracketIndex !== -1) { 
      brackets.push(str[i]);
    } 
    //닫힌 괄호일 경우
    else if(closeBracketIndex !== -1) { 
      //이전에 열린 괄호가 없으면 종료
      if(brackets[brackets.length - 1] !== openBracketList[closeBracketIndex]) {
        return false;
      }
      //열린 괄호가 있으면 열린 괄호 제거
      else { 
        brackets.pop();
      }
    }
    console.log(brackets);
  }
  let result = true;
  if(brackets.length !== 0) 
    result = false;
  return result;
};

let output = balancedBrackets('(');
console.log(output); // // -> false

output = balancedBrackets('[(]{)}');
console.log(output); // --> false