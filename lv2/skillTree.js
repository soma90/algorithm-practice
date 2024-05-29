/*  
https://school.programmers.co.kr/learn/courses/30/lessons/49993

--- 스킬트리 ---

-- 문제 설명
선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

예를 들어 선행 스킬 순서가 스파크 → 라이트닝 볼트 → 썬더일때, 썬더를 배우려면 먼저 라이트닝 볼트를 
배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 스파크 → 힐링 → 
라이트닝 볼트 → 썬더와 같은 스킬트리는 가능하지만, 썬더 → 스파크나 라이트닝 볼트 → 스파크 → 힐링 → 
썬더와 같은 스킬트리는 불가능합니다.

선행 스킬 순서 skill과 유저들이 만든 스킬트리1를 담은 배열 skill_trees가 매개변수로 주어질 때, 
가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

-- 제한 조건
스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
스킬 순서와 스킬트리는 문자열로 표기합니다.
예를 들어, C → B → D 라면 "CBD"로 표기합니다
선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
skill_trees는 길이 1 이상 20 이하인 배열입니다.
skill_trees의 원소는 스킬을 나타내는 문자열입니다.
skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.

-- 입출력 예
skill	skill_trees	return
"CBD"	["BACDE", "CBADF", "AECB", "BDA"]	2

-- 입출력 예 설명
"BACDE": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트립니다.
"CBADF": 가능한 스킬트리입니다.
"AECB": 가능한 스킬트리입니다.
"BDA": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트리입니다.

1.스킬 트리: 유저가 스킬을 배울 순서 ↩
*/

/**
 * -- 풀이 1
 * skill을 배열로 저장 후 먼저 배워야 할 skill을 shift() 해서 현재 배울 수 있는 skill로 저장합니다.
 * skill_tree에 대해 배울수 있는 skill 인지 검사합니다
 * 현재 skill이 skillArr에 포함되어 있으면 순번에 맞지 않는 skill을 배우는 것이므로 불가능 합니다.
 * 현재 skill이 저장한 현재 배울 수 있는 skill과 같다면 현재 배울 수 있는 스킬을 다음 skill로 업데이트 합니다.
 * 위의 검사 함수를 filter를 이용해 skill_trees에서 가능한 배열로 만들고 배열 길이를 구합니다. 
 */
function solution(skill, skill_trees) {
  //가능한 스킬트리인지 확인
  const isValidSkillTree = (skill_tree) => {
    let skillArr = skill.split("");
    let currSkill = skillArr.shift();
    for (let i = 0; i < skill_tree.length; i++) {
      //스킬트리 스킬에 현재 배울수 없는 스킬일때
      if (skillArr.includes(skill_tree[i])) return false;
      //스킬트리 스킬이 현재 배울 수 있는 스킬일때
      if (currSkill === skill_tree[i]) currSkill = skillArr.shift();
    }
    return true;
  };

  return skill_trees.filter(isValidSkillTree).length;
}

/**
 * -- 풀이 2
 * skill의 index를 맵에 저장합니다.
 * 다음 배워야할 skill index를 저장하고 현재 검사하는 skill index와 비교해서 배울 수 있는 skill인지 검사합니다.
 * 모두 배울 수 있는 skill 이라면 가능 한 skill tree로 answer를 증가 시킵니다.
 */
function solution(skill, skill_trees) {
  let answer = 0;
  const skillMap = new Map();

  /**
   * skill 인덱스를 map에 저장
   */
  for (let i = 0; i < skill.length; i++) {
    skillMap.set(skill[i], i);
  }

  /**
   * skill_trees 가 가능한지 검사
   */
  for (const skill_tree of skill_trees) {
    let isPossible = true;
    let learnSkillIndex = 0;

    for (const userSkill of skill_tree) {
      const skillIndex = skillMap.get(userSkill);

      // skill 목록에 없을 경우 skill tree 가능
      if (skillIndex === undefined) continue;

      // 현재 검사중인 skill의 인덱스가 배워야 할 skill 인덱스와 다를 경우
      // 순번이 맞지 않으므로 불가능한 스킬트리
      if (skillIndex !== learnSkillIndex) {
        isPossible = false;
        break;
      }
      // 순번에 맞으므로 배워야할 스킬 인덱스를 증가
      else {
        learnSkillIndex++;
      }
    }

    // 가능한 skill tree면 업데이트
    if (isPossible) {
      console.log(skill_tree);
      answer++;
    }
  }

  return answer;
}

let result = solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]);
console.log(result);
