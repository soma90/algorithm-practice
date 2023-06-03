/* 
--문제
문자열을 요소로 갖는 배열을 입력받아 가장 짧은 문자열과 가장 긴 문자열을 제거한 배열을 리턴해야 합니다.

--입력
인자 1 : arr
string 타입을 요소로 갖는 배열
arr[i].length는 20 이하

--출력
배열을 리턴해야 합니다.

--주의 사항
가장 짧은 문자열의 길이와 가장 긴 문자열의 길이가 같은 경우는 없습니다.
가장 짧은 문자열 또는 가장 긴 문자열이 다수일 경우, 나중에 위치한 문자열을 제거합니다.

--입출력 예시
let output = removeExtremes(['a', 'b', 'c', 'def']);
console.log(output); // --> ['a', 'b']

output = removeExtremes(['where', 'is', 'the', 'longest', 'word']);
console.log(output); // --> ['where', 'the', 'word',]
*/

function removeExtremes(arr) {
  let short = 20;
  let long = 0;
  let shortIndex = 0;
  let longIndex = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].length <= short) {
      short = arr[i].length;
      shortIndex = i;
    }
    if(arr[i].length >= long) {
      long = arr[i].length;
      longIndex = i
    }
  }

  return arr.filter((val, index) => {
    return (index !== shortIndex) && (index !== longIndex);
  }) 
}

let output = removeExtremes(['', '', 'eept', 'ssps', 'sss']);
console.log(output); // --> ['a', 'b']

output = removeExtremes(['where', 'is', 'the', 'longest', 'word']);
console.log(output); // --> ['where', 'the', 'word',]