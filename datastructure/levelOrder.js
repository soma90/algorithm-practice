/* 
---이진트리 레벨순회(levelorder)---

--문제
이진트리의 root노드를 줄 것입니다. 해당 이진트리의 레벨 순회 결과를 출력하세요.

--입력
인자 1 : TreeNode
TreeNode 타입으로 된 root 노드

--출력
number[][] 을 리턴해야 합니다.

--주의 사항
이진트리 내의 노드 갯수의 범위는 0 - 2000 입니다.

--입출력 예시
class TreeNode {
	constructor(val, left, right) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

      //   3
      //  / \
      // 9  20
      //   /  \
      //  15   7

const root1 = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
const result1 = levelOrderTraversal(root1);
console.log(result1); // [[3], [9, 20], [15, 7]];

const root2 = new TreeNode(1);
const result2 = levelOrderTraversal(root2);
console.log(result2); // [[1]]

const root3 = null;
const result3 = levelOrderTraversal(root3);
console.log(result3); // []
*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const levelOrderTraversal = (root) => {
  if (!root) return [];
  let result = [];
  let queue = [[root, 0]];

  while (queue.length > 0) {
    const [node, depth] = queue.shift();
    result[depth] = result[depth] || [];
    result[depth].push(node.val);

    node.left && queue.push([node.left, depth + 1]);
    node.right && queue.push([node.right, depth + 1]);
  }

  return result;
};

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
        3
       / \
      9  20
        /  \
       15   7
*/
const root1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
const result1 = levelOrderTraversal(root1);
console.log(result1); // [[3], [9, 20], [15, 7]];

const root2 = new TreeNode(1);
const result2 = levelOrderTraversal(root2);
console.log(result2); // [[1]]

const root3 = null;
const result3 = levelOrderTraversal(root3);
console.log(result3); // []
