/* function solution(n, k, cmd) {
  let table = Array.from({ length: n }, () => true);
  let delStack = [];

  const moveTable = (op, count) => {
    while (k < n && k >= 0 && count > 0) {
      if (op === "U") k--;
      else if (op === "D") k++;
      if (table[k]) count--;
    }

    if (k < 0) k = 0;
    else if (k >= n) k = n - 1;
  };

  cmd.forEach((el) => {
    const splitedCmd = el.split(" ");
    switch (splitedCmd[0]) {
      case "D":
      case "U":
        moveTable(splitedCmd[0], Number(splitedCmd[1]));
        break;
      case "C":
        delStack.push(k);
        table[k] = false;
        if (k === n - 1) {
          moveTable("U", 1);
        } else {
          moveTable("D", 1);
        }
        break;
      case "Z":
        table[delStack.pop()] = true;
        break;
    }
  });
  //console.log(k, table);
  return table.reduce((acc, cur, i) => acc + (table[i] ? "O" : "X"), "");
} */

function solution(n, k, cmd) {
  let delStack = [];

  //n개의 링크드리스트 만들기
  let tableList = new LinkedList();
  for (let i = 0; i < n; i++) {
    tableList.append(i);
  }
  //선택 행 설정
  tableList.setSelected(k);

  cmd.forEach((el) => {
    const splitedCmd = el.split(" ");
    switch (splitedCmd[0]) {
      case "D":
      case "U":
        tableList.moveSelected(splitedCmd[0], Number(splitedCmd[1]));
        break;
      case "C":
        const selectedNode = tableList.selected;
        //지운행 el를 stack에 저장
        delStack.push(selectedNode.element);
        //행 선택 갱신
        if (tableList.isLast(selectedNode)) tableList.moveSelected("U", 1);
        else tableList.moveSelected("D", 1);
        //행지우기
        tableList.remove(selectedNode);
        break;
      case "Z":
        const el = delStack.pop();
        tableList.insert(el);
        break;
    }
  });
  console.log(tableList.toString(), tableList.selected);
  return tableList.getAnswer(n);
}

class Node {
  constructor(element) {
    this.element = element;
    this.front = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("head");
    this.selected = this.head;
    this.size = 0;
  }

  append(el) {
    let newNode = new Node(el);
    let current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    newNode.front = current;
    current.next = newNode;    
    this.size++;
  }

  insert(el) {
    let newNode = new Node(el);
    let prevNode = this.find(el);
    newNode.next = prevNode.next;
    newNode.front = prevNode;
    prevNode.next = newNode;
    this.size++;
  }

  remove(node) {
    let prevNode = node.front;
    let nextNode = node.next;
    prevNode.next = node.next;
    if (nextNode) nextNode.front = prevNode;
    this.size--;
  }
  //el의 값을 갖고 있거나, el보다 작고 가장 근접한 노드 찾기
  find(el) {
    let currNode = this.head;
    while (currNode.next != null && currNode.next.element <= el) {
      currNode = currNode.next;
    }
    return currNode;
  }

  setSelected(el) {
    let currNode = this.head;
    while (currNode.next !== null) {
      if (currNode.element === el) {
        this.selected = currNode;
        return;
      }
      currNode = currNode.next;
    }
  }

  moveSelected(op, count) {
    let condition, action;
    if (op === "U") {
      condition = () =>
        this.selected.front === null || this.selected.front.element === "head";
      action = () => (this.selected = this.selected.front);
    } else if (op === "D") {
      condition = () => this.selected.next === null;
      action = () => (this.selected = this.selected.next);
    }

    for (let i = 0; i < count; i++) {
      if (condition()) return;
      action();
    }
  }

  isLast(node) {
    if (node.next === null) return true;
    return false;
  }

  getAnswer(n) {
    let answer = "";
    let current = this.head.next;
    for (let i = 0; i < n; i++) {
      if (current !== null && current.element === i) {
        answer += "O";
        current = current.next;
      } else {
        answer += "X";
      }
    }

    return answer;
  }

  toString() {
    let array = [];
    let currNode = this.head;
    while (currNode.next !== null) {
      array.push(currNode.next.element);
      currNode = currNode.next;
    }
    return array;
  }
}

let result = solution(8, 2, [
  "D 2",
  "C",
  "U 3",
  "C",
  "D 4",
  "C",
  "U 2",
  "Z",
  "Z",
  "U 1",
  //"C",
]);
console.log(result);
