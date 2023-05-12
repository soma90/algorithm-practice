/* 
Stack 구현을 위한 기본적인 코드가 작성되어 있습니다. Stack 자료구조의 특성을 이해하고 FILL_ME_IN을 채워 테스트를 통과해 주세요.

--멤버 변수
데이터를 저장할 Object 타입의 storage
마지막에 들어온 데이터를 가리키는 Number 타입의 포인터 top

--메서드
size(): 스택에 추가된 데이터의 크기를 리턴해야 합니다.
push(): 스택에 데이터를 추가할 수 있어야 합니다.
pop(): 가장 나중에 추가된 데이터를 스택에서 삭제하고 삭제한 데이터를 리턴해야 합니다.

--주의 사항
내장 객체 Array.prototype에 정의된 메서드는 사용하면 안 됩니다.
포인터 변수 top의 초기값은 -1, 0, 1등 임의로 지정할 수 있지만,
여기서는 빈 스택을 나타내는 -1으로 초기화되며 이후 push, pop에 따라 1씩 증감해주어 데이터가 추가될 인덱스의 위치를 가리키도록 합니다.

--사용 예시
const stack = new Stack();

stack.size(); // 0
for(let i = 1; i < 10; i++) {
  	stack.push(i);
}
stack.pop(); // 9
stack.pop(); // 8
stack.size(); // 7
stack.push(8);
stack.size(); // 8
...
 */

class Stack {
  constructor() {
    this.storage = {};
    this.top = -1; // 스택의 가장 상단을 가리키는 포인터 변수를 초기화 합니다.
  }

  size() {
    return this.top + 1;
  }

	// 스택에 데이터를 추가 할 수 있어야 합니다.
  push(element) {
    this.top += 1;
    this.storage[this.top] = element;
  }
	
	// 가장 나중에 추가된 데이터가 가장 먼저 추출되어야 합니다.
  pop() {
    // 빈 스택에 pop 연산을 적용해도 에러가 발생하지 않아야 합니다
    if (this.top === -1) {
      return;
    }

    const result = this.storage[this.top];
    delete this.storage[this.top];
    this.top -= 1;
    
    return result;
  }
}