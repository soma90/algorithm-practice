/* 

*/

class Tree {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.left = null;
    this.right = null;
  }

  insert(x, y, i) {
    if (x < this.x) {
      if (this.left) this.left.insert(x, y, i);
      else this.left = new Tree(x, y, i);
    } else if (x > this.x) {
      if (this.right) this.right.insert(x, y, i);
      else this.right = new Tree(x, y, i);
    }
  }

  preorder(callback) {
    callback(this.i);
    if (this.left) this.left.preorder(callback);
    if (this.right) this.right.preorder(callback);
  }

  postorder(callback) {
    if (this.left) this.left.postorder(callback);
    if (this.right) this.right.postorder(callback);
    callback(this.i);
  }
}

function solution(nodeinfo) {
  let answer = [[], []];

  //인덱스를 추가한 노드정보를 정렬
  let nodeInfo = nodeinfo.map((el, i) => [...el, i + 1]);
  nodeInfo.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return b[1] - a[1];
    }
  });

  //트리 생성 및 insert
  const mazeTree = new Tree(nodeInfo[0][0], nodeInfo[0][1], nodeInfo[0][2]);
  for (let i = 1; i < nodeInfo.length; i++) {
    mazeTree.insert(nodeInfo[i][0], nodeInfo[i][1], nodeInfo[i][2]);
  }

  //순회
  mazeTree.preorder((value) => answer[0].push(value));
  mazeTree.postorder((value) => answer[1].push(value));

  return answer;
}

let result = solution([
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2],
]);
console.log(result);
