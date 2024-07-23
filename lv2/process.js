/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42587

--- 프로세스 ---

-- 문제 설명
운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다. 
이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.

1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
  3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고, 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.

현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와, 
몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때, 
해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

-- 제한사항
priorities의 길이는 1 이상 100 이하입니다.
priorities의 원소는 1 이상 9 이하의 정수입니다.
priorities의 원소는 우선순위를 나타내며 숫자가 클 수록 우선순위가 높습니다.
location은 0 이상 (대기 큐에 있는 프로세스 수 - 1) 이하의 값을 가집니다.
priorities의 가장 앞에 있으면 0, 두 번째에 있으면 1 … 과 같이 표현합니다.

-- 입출력 예
priorities	location	return
[2, 1, 3, 2]	2	1
[1, 1, 9, 1, 1, 1]	0	5

-- 입출력 예 설명
- 예제 #1
문제에 나온 예와 같습니다.

- 예제 #2
6개의 프로세스 [A, B, C, D, E, F]가 대기 큐에 있고 중요도가 [1, 1, 9, 1, 1, 1] 이므로 
[C, D, E, F, A, B] 순으로 실행됩니다. 따라서 A는 5번째로 실행됩니다.
*/

/**
 * -- 풀이 1
 * queue에 piority와 인덱스를 저장합니다.
 * 남아있는 priorities 우선순위가 가장 큰값을 확인하기 위해 오름차순으로 정렬합니다.
 * queue의 값을 순회 하면서 priorities 배열의 마지막 값의 우선순위에 해당하는 queue의 값일 경우 실행시켜 제거 시킵니다.
 * 제거하는 값의 index값이 location값과 같으면 답안 이므로 순회를 멈추고 리턴합니다.
 */
function solution(priorities, location) {
  let answer = 0;
  const queue = [];

  for (let i = 0; i < priorities.length; i++) {
    queue.push([i, priorities[i]]);
  }

  priorities.sort((a, b) => a - b);

  while (priorities.length) {
    const [index, priority] = queue.shift();

    if (priority === priorities.at(-1)) {
      priorities.pop();
      answer++;
      if (index === location) break;
    } else {
      queue.push([index, priority]);
    }
  }

  return answer;
}

let result = solution([1, 1, 9, 1, 1, 1], 0);
console.log(result);

/**
 * -- 풀이 2
 */
function solution2(priorities, location) {
  let answer = 0;
  let queue = Array.from({ length: priorities.length }, (_, i) => [
    i,
    priorities[i],
  ]);

  while (queue.length > 0) {
    const priority = queue.shift();
    if (queue.some((el) => el[1] > priority[1])) queue.push(priority);
    else {
      answer++;
      if (priority[0] === location) break;
    }
  }

  return answer;
}

let result2 = solution2([1, 1, 9, 1, 1, 1], 0);
console.log(result2);
