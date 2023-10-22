/* 
---유효한 괄호쌍---

--문제
입력된 괄호 값들이 모두 쌍이 맞게 올바른지를 판단해 모두 쌍이 맞으면 true 
그렇지 않으면 false를 출력하세요.

입력된 괄호 값들이 유효한 경우들은 다음에 해당합니다.
1. 열린 괄호는 같은 타입의 닫힌 괄호로 닫혀있어야 한다.
2. 열린 괄호는 올바른 순서대로 닫혀야만 한다.
3. 모든 닫힌 괄호는 그에 상응하는 같은 타입의 열린 괄호를 갖고 있다.

입력값을 통해 들어오는 괄호는 ()[]{}로만 이루어져 있습니다.

--입력
인자 1 : str
string 타입으로 된 문장

--출력
boolean 타입을 리턴해야 합니다.

--주의 사항
입력값을 통해 들어오는 괄호는 ()[]{}로만 이루어져 있습니다.
입력값으로 들어오는 str의 길이는 0부터 10^4승 까지 입니다.

--입출력 예시
const result1 = isValid('[]');
console.log(result1); // true

const result2 = isValid('[)');
console.log(result2); // false

const result3 = isValid('[]{}()');
console.log(result3); // true

const result4 = isValid('[]{)()');
console.log(result4); // false
	
--힌트
스택을 사용해 보세요.
열린 괄호인 경우 스택에 push합니다.
닫힌 괄호인 경우에는 스택의 top을 확인하고, 해당 닫힌 괄호와 짝이 맞는 열린 괄호인지를 확인합니다.
*/

const isValid = (str) => {
  if (str.length === 0) return false;

  const leftParentheses = "[{(";
  const rightParentheses = "]})";
  const stack = [];

  for (const char of str) {
    let idx = rightParentheses.indexOf(char);
    if (idx !== -1) {
      const left = stack.pop();
      if (left !== leftParentheses[idx]) return false;
    } else stack.push(char);
  }

  return stack.length > 0 ? false : true;
};

const result1 = isValid("[]");
console.log(result1); // true

const result2 = isValid("[)");
console.log(result2); // false

const result3 = isValid("[]{}()");
console.log(result3); // true

const result4 = isValid("[]{)()");
console.log(result4); // false
