/* 
https://www.acmicpc.net/problem/24511

---queuestack---

--문제
한가롭게 방학에 놀고 있던 도현이는 갑자기 재밌는 자료구조를 생각해냈다. 그 자료구조의 이름은 queuestack이다.

queuestack의 구조는 다음과 같다. 1번, 2번, ... , N번의 자료구조(queue 혹은 stack)가 나열되어있으며, 
각각의 자료구조에는 한 개의 원소가 들어있다.

queuestack의 작동은 다음과 같다.
 
- x0을 입력받는다. 
- x0을 1번 자료구조에 삽입한 뒤 1번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 x1이라 한다.
- x1을 2번 자료구조에 삽입한 뒤 2번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 x2이라 한다.
- ...
- xN-1을 N번 자료구조에 삽입한 뒤 N번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 xN이라 한다.
- xN을 리턴한다.
도현이는 길이 M의 수열 C를 가져와서 수열의 원소를 앞에서부터 차례대로 queuestack에 삽입할 것이다. 
이전에 삽입한 결과는 남아 있다. (예제1 참고)

queuestack에 넣을 원소들이 주어졌을 때, 해당 원소를 넣은 리턴값을 출력하는 프로그램을 작성해보자.

--입력
첫째 줄에 queuestack을 구성하는 자료구조의 개수 N이 주어진다. (1 <= N <= 100,000)
둘째 줄에 길이 N의 수열 A가 주어진다. i번 자료구조가 큐라면 Ai = 0, 스택이라면 Ai = 1이다.
셋째 줄에 길이 N의 수열 B가 주어진다. Bi는 i번 자료구조에 들어 있는 원소이다. (1 <= Bi <= 1,000,000,000)
넷째 줄에 삽입할 수열의 길이 M이 주어진다. (1 <= M <= 100,000)
다섯째 줄에 queuestack에 삽입할 원소를 담고 있는 길이 M의 수열 C가 주어진다. (1 <= Ci <= 1,000,000,000)
입력으로 주어지는 모든 수는 정수이다.

--출력
수열 C의 원소를 차례대로 queuestack에 삽입했을 때의 리턴값을 공백으로 구분하여 출력한다.

-예제 입력 1 
4
0 1 1 0
1 2 3 4
3
2 4 7
-예제 출력 1 
4 1 2

-예제 입력 2 
5
1 1 1 1 1
1 2 3 4 5
3
1 3 5
-예제 출력 2 
1 3 5
*/

/* 
--풀이
자료구조가 큐인것만 숫자가 바뀐다. 
자료구조가 큐인 마지막 인덱스의 숫자가 리턴값이 되고, 바뀌는 숫자는 자신보다 바로 앞의 큐에 있는 숫자로 바뀌게 된다.
결국 수열의 오른쪽 끝에서 부터 자료구조가 큐인 인덱스의 숫자들이 리턴값이 된다
수열의 모든수가 리턴되면 그 다음으로 삽입된 숫자가 리턴값이 된다
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);
const c = input[4].split(" ").map(Number);

const result = [];

//수열 b 의 자료구조가 큐인값을 끝에서 부터 result에 삽입
for (let i = b.length - 1; i >= 0; i--) {
  if (a[i] === 0) result.push(b[i]);
}
//수열 c 값 result 삽입
for (const n of c) {
  result.push(n);
}

console.log(result.slice(0, c.length).join(" "));
