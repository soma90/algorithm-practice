/* 
https://school.programmers.co.kr/learn/courses/30/lessons/42578

--- 의상 ---

-- 문제 설명
코니는 매일 다른 옷을 조합하여 입는것을 좋아합니다.

예를 들어 코니가 가진 옷이 아래와 같고, 오늘 코니가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 
청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야합니다.

종류	이름
얼굴	동그란 안경, 검정 선글라스
상의	파란색 티셔츠
하의	청바지
겉옷	긴 코트
코니는 각 종류별로 최대 1가지 의상만 착용할 수 있습니다. 예를 들어 위 예시의 경우 동그란 안경과 검정 
선글라스를 동시에 착용할 수는 없습니다.
착용한 의상의 일부가 겹치더라도, 다른 의상이 겹치지 않거나, 혹은 의상을 추가로 더 착용한 경우에는 서로 다른 
방법으로 옷을 착용한 것으로 계산합니다.
코니는 하루에 최소 한 개의 의상은 입습니다.
코니가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 
함수를 작성해주세요.

-- 제한사항
clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
코니가 가진 의상의 수는 1개 이상 30개 이하입니다.
같은 이름을 가진 의상은 존재하지 않습니다.
clothes의 모든 원소는 문자열로 이루어져 있습니다.
모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.

-- 입출력 예
clothes	return
[["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]	5
[["crow_mask", "face"], ["blue_sunglasses", "face"], ["smoky_makeup", "face"]]	3

-- 입출력 예 설명
- 예제 #1
headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 
아래와 같이 5개의 조합이 가능합니다.

1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses

- 예제 #2
face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

1. crow_mask
2. blue_sunglasses
3. smoky_makeup
*/

/**
 * -- 풀이
 * 각각의 옷의 종류에 안입는 경우수 1을 더한 후 조합할 수 있는 경우의 수를 구합니다.
 * 나온 결과값에 모두 안입는 경우수 1을 뺀 후 결과를 리턴합니다. 
 */
function solution(clothes) {
  let clothesMap = new Map();
  clothes.forEach(([name, kind]) => {
    clothesMap.set(kind, (clothesMap.get(kind) || 1) + 1);
  });

  return [...clothesMap.values()].reduce((acc, cur) => acc * cur, 1) - 1;
}

let result = solution([
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"],
]);
console.log(result);


// // 경우의 수를 재귀를 이용해 모두구하는 방법 - 시간초과
// function solution(clothes) {
//   let answer = 0;
//   //clothes 정보를 map으로 저장
//   let clothesMap = new Map();
//   clothes.forEach(([name, kind]) => {
//     clothesMap.set(kind, [...(clothesMap.get(kind) || []), name]);
//   });

//   //조합의 수 구하기
//   let combi = (_clothes, idx = 0, cnt = 0) => {
//     if (idx === _clothes.length) {
//       if (cnt >= 1) answer++;
//       return;
//     }
//     //선택했을때
//     _clothes[idx].forEach(() => {
//       combi(_clothes, idx + 1, cnt + 1);
//     });
//     //선택하지 않았을때
//     combi(_clothes, idx + 1, cnt);
//   };

//   combi([...clothesMap.values()]);

//   return answer;
// } 

