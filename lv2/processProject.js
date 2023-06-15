/* 
---과제 진행하기---

--문제 설명
과제를 받은 루는 다음과 같은 순서대로 과제를 하려고 계획을 세웠습니다.

과제는 시작하기로 한 시각이 되면 시작합니다.
새로운 과제를 시작할 시각이 되었을 때, 기존에 진행 중이던 과제가 있다면 진행 중이던 과제를 멈추고 새로운 과제를 시작합니다.
진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면, 멈춰둔 과제를 이어서 진행합니다.
만약, 과제를 끝낸 시각에 새로 시작해야 되는 과제와 잠시 멈춰둔 과제가 모두 있다면, 새로 시작해야 하는 과제부터 진행합니다.
멈춰둔 과제가 여러 개일 경우, 가장 최근에 멈춘 과제부터 시작합니다.
과제 계획을 담은 이차원 문자열 배열 plans가 매개변수로 주어질 때, 과제를 끝낸 순서대로 이름을 배열에 담아 return 하는 solution 함수를 완성해주세요.

--제한사항
3 ≤ plans의 길이 ≤ 1,000
plans의 원소는 [name, start, playtime]의 구조로 이루어져 있습니다.
name : 과제의 이름을 의미합니다.
2 ≤ name의 길이 ≤ 10
name은 알파벳 소문자로만 이루어져 있습니다.
name이 중복되는 원소는 없습니다.
start : 과제의 시작 시각을 나타냅니다.
"hh:mm"의 형태로 "00:00" ~ "23:59" 사이의 시간값만 들어가 있습니다.
모든 과제의 시작 시각은 달라서 겹칠 일이 없습니다.
과제는 "00:00" ... "23:59" 순으로 시작하면 됩니다. 즉, 시와 분의 값이 작을수록 더 빨리 시작한 과제입니다.
playtime : 과제를 마치는데 걸리는 시간을 의미하며, 단위는 분입니다.
1 ≤ playtime ≤ 100
playtime은 0으로 시작하지 않습니다.
배열은 시간순으로 정렬되어 있지 않을 수 있습니다.
진행중이던 과제가 끝나는 시각과 새로운 과제를 시작해야하는 시각이 같은 경우 진행중이던 과제는 끝난 것으로 판단합니다.

--입출력 예
plans	result
[["korean", "11:40", "30"], ["english", "12:10", "20"], ["math", "12:30", "40"]]	["korean", "english", "math"]
[["science", "12:40", "50"], ["music", "12:20", "40"], ["history", "14:00", "30"], ["computer", "12:30", "100"]]	["science", "history", "computer", "music"]
[["aaa", "12:00", "20"], ["bbb", "12:10", "30"], ["ccc", "12:40", "10"]]	["bbb", "ccc", "aaa"]

--입출력 예 설명
입출력 예 #1

"korean", "english", "math"순으로 과제를 시작합니다. 
"korean" 과제를 "11:40"에 시작하여 30분 후인 "12:10"에 마치고, 즉시 "english" 과제를 시작합니다. 
20분 후인 "12:30"에 "english" 과제를 마치고, 즉시 "math" 과제를 시작합니다. 
40분 후인 "01:10"에 "math" 과제를 마칩니다. 
따라서 "korean", "english", "math" 순으로 과제를 끝내므로 차례대로 배열에 담아 반환합니다.

입출력 예 #2

"music", "computer", "science", "history" 순으로 과제를 시작합니다.

시각	진행 중 과제	잠시 멈춘 과제	설명
"12:20"	"music"	[ ]	"music"을 시작합니다.
"12:30"	"computer"	["music"]	"music"을 잠시 멈추고(남은 시간 30분) "computer"를 시작합니다
"12:40"	"science"	["music", "computer"]	"computer"를 잠시 멈추고(남은 시간 90분) "science"를 시작합니다
"13:30"	"computer"	["music"]	"science"를 끝내고 가장 최근에 멈춘 "computer"를 다시 시작합니다
"14:00"	"history"	["music", "computer"]	"computer"를 잠시 멈추고(남은 시간 60분) "history"를 시작합니다
"14:30"	"computer"	["music"]	"history"를 끝내고 가장 최근에 멈춘 "computer"를 다시 시작합니다"
"15:30"	"music"	[ ]	"computer"를 끝내고 가장 최근에 멈춘 "music"을 다시 시작합니다"
"16:00"	-	[ ]	"music"을 끝냅니다
따라서 ["science", "history", "computer", "music"] 순서로 과제를 마칩니다.

입출력 예 #3

설명 생략
*/

function solution(plans) {
  //과제들 분단위로 변환, 정렬
  const convertSecond = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const plansList = plans.map((el) => {
    const time = convertSecond(el[1]);
    const processTime = Number(el[2]);
    return [el[0], time, processTime];
  });
  plansList.sort((a, b) => a[1] - b[1]);

  //과제 수행 시작
  let answer = []; //마친 과제
  let planStack = []; //마치지 못한 과제

  for (let i = 0; i < plansList.length - 1; i++) {
    let bTime = plansList[i + 1][1] - plansList[i][1]; //현재plan과 다음plan 사이의 시간
    let rTime = plansList[i][2] - bTime; //현재plan을 진행하고 남은 시간
    //진행중인 plan 체크
    if (rTime <= 0) {
      answer.push(plansList[i][0]);
      //남은 시간동안 진행할 완료되지 않은 plan 체크
      while (planStack.length > 0 && rTime < 0) {
        const plan = planStack.pop();
        rTime += plan[1];
        if (rTime <= 0) {
          answer.push(plan[0]);
        } else {
          planStack.push([plan[0], rTime]);
        }
      }
    } else {
      planStack.push([plansList[i][0], rTime]);
    }
    console.log(planStack, answer);
  }

  //수행되지 않은 남은 과제들 저장
  const lastPlan = plansList.pop();
  answer.push(lastPlan[0]);
  while (planStack.length > 0) {
    const plan = planStack.pop();
    answer.push(plan[0]);
  }

  return answer;
}

let result = solution([
  ["korean", "11:40", "30"],
  ["english", "12:10", "20"],
  ["math", "12:30", "40"],
]);
console.log(result);

result = solution([
  ["science", "12:40", "50"],
  ["music", "12:20", "40"],
  ["history", "14:00", "30"],
  ["computer", "12:30", "100"],
]);
console.log(result);

result = solution([
  ["aaa", "12:00", "20"],
  ["bbb", "12:10", "30"],
  ["ccc", "12:40", "10"],
]);
console.log(result);
