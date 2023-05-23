/*  
Tree 구현을 위한 기본적인 코드가 작성되어 있습니다. Tree 자료구조의 특성을 이해하고 FILL_ME_IN 을 채워 테스트를 통과해주세요.

--멤버 변수
입력 데이터를 담을 수 있는 value
하위 노드를 저장할 수 있는 Array 타입의 children

--메서드
insertNode(value): 입력받은 value를 Tree에 계층적으로 추가할 수 있어야 합니다.
contains(value): 트리에 포함된 데이터를 찾을 수 있어야 합니다.

--주의 사항
value는 어떠한 값도 들어갈 수 있지만 현재 구현하는 Tree는 숫자로 제한합니다.

--사용 예시
const rootNode = new Tree(null);

for(let i = 0; i <= 4; i++) {
  if(rootNode.children[i]) {
    rootNode.children[i].insertNode(i);
  }
 rootNode.insertNode(i); 
}
rootNode; // {value: null, children: Array(5)}
rootNode.contains(5); // false
rootNode.contains(1); // true
...
*/

class Tree {
  constructor(value) {
		// constructor로 만든 객체는 트리의 Node가 됩니다.
    this.value = value;
    this.children = [];
  }

	// 트리의 삽입 메서드를 만듭니다.
  insertNode(value) {
		// 값이 어떤 이름으로 만들어지고 어느 위치에 붙는지 떠올리는 것이 중요합니다.
		// TODO: 트리에 붙게 될 childNode를 만들고, children에 넣어야 합니다.
    const childNode = new Tree(value);
    this.children.push(childNode);
  }

	// 트리 안에 해당 값이 포함되어 있는지 확인하는 메서드를 만듭니다.
  contains(value) {
		// TODO: 값이 포함되어 있다면 true를 반환하세요. 
    if (this.value === value) {
      return true;
    }
		// TODO: 값을 찾을 때까지 children 배열을 순회하며 childNode를 탐색하세요.
    for(let i = 0; i < this.children.length; i++) {
      if(this.children[i].contains(value)) return true;
    }
	
		// 전부 탐색했음에도 불구하고 찾지 못했다면 false를 반환합니다.
    return false;
  }
}

const rootNode = new Tree(null);

for(let i = 0; i <= 4; i++) {
  if(rootNode.children[i]) {
    rootNode.children[i].insertNode(i);
  }
 rootNode.insertNode(i); 
}
rootNode; // {value: null, children: Array(5)}
rootNode.contains(5); // false
rootNode.contains(1); // true