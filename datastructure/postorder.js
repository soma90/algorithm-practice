/* 
---이진트리 후위순회(postorder)---

--문제
이진트리의 root노드를 줄 것입니다. 해당 이진트리의 후위 순회 결과를 출력하세요.

--입력
인자 1 : TreeNode
TreeNode 타입으로 된 root 노드

--출력
number[] 을 리턴해야 합니다.

--주의 사항
이진트리 내의 노드 갯수의 범위는 0 - 100 입니다.
해당 문제를 재귀적인 해결책과 반복적인 해결책 모두를 사용해 풀어보세요.

--입출력 예시

class TreeNode {
	constructor(val, left, right) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

//     1
//      \
//       2
//      /
//     3
const root1 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
const result1 = postOrderTraversal(root1);
console.log(result1); // [3, 2, 1]

const root2 = null;
const result2 = postOrderTraversal(root2);
console.log(result2); // []

const root3 = new TreeNode(1);
const result3 = postOrderTraversal(root3);
console.log(result3); // [1]
*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */

//재귀를 이용한 풀이
const postOrderTraversal = (root) => {
  if (!root) return [];

  let val = [];
  if (root.left) val = [...postOrderTraversal(root.left)];
  if (root.right) val = [...val, ...postOrderTraversal(root.right)];
  if (root.val) val = [...val, root.val];
  return val;
};

//반복문을 이용한 풀이
/* const postOrderTraversal = (root) => {
  if (!root) return [];
  let result = [];
  let stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.unshift(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return result;
}; */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

//     1
//      \
//       2
//      /
//     3
const root1 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
const result1 = postOrderTraversal(root1);
console.log(result1); // [3, 2, 1]

const root2 = null;
const result2 = postOrderTraversal(root2);
console.log(result2); // []

const root3 = new TreeNode(1);
const result3 = postOrderTraversal(root3);
console.log(result3); // [1]
