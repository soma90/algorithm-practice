/* 
https://www.acmicpc.net/problem/2941

---크로아티아 알파벳 성공다국어---

--문제
예전에는 운영체제에서 크로아티아 알파벳을 입력할 수가 없었다. 따라서, 다음과 같이 크로아티아 알파벳을 
변경해서 입력했다.

-크로아티아 알파벳	변경
č	c=
ć	c-
dž	dz=
đ	d-
lj	lj
nj	nj
š	s=
ž	z=

예를 들어, ljes=njak은 크로아티아 알파벳 6개(lj, e, š, nj, a, k)로 이루어져 있다. 단어가 주어졌을 때, 
몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

dž는 무조건 하나의 알파벳으로 쓰이고, d와 ž가 분리된 것으로 보지 않는다. lj와 nj도 마찬가지이다. 
위 목록에 없는 알파벳은 한 글자씩 센다.

--입력
첫째 줄에 최대 100글자의 단어가 주어진다. 알파벳 소문자와 '-', '='로만 이루어져 있다.

단어는 크로아티아 알파벳으로 이루어져 있다. 문제 설명의 표에 나와있는 알파벳은 변경된 형태로 입력된다.

--출력
입력으로 주어진 단어가 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

-예제 입력 1 
ljes=njak
-예제 출력 1 
6

-예제 입력 2 
ddz=z=
-예제 출력 2 
3

-예제 입력 3 
nljj
-예제 출력 3 
3

-예제 입력 4 
c=c=
-예제 출력 4 
2

-예제 입력 5 
dz=ak
-예제 출력 5 
3
*/

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(" ");
let str = input[0].trim();

const alphabetMap = new Map([
  ["c", ["c=", "c-"]],
  ["d", ["dz=", "d-"]],
  ["l", ["lj"]],
  ["n", ["nj"]],
  ["s", ["s="]],
  ["z", ["z="]],
]);

let count = 0;

for (let i = 0; i < str.length; i++) {
  const alphabetArr = alphabetMap.get(str[i]);
  //현재 문자가 변경된 알파벳에서 시작 알파벳이 아닐경우
  if (!alphabetArr) {
    count++;
    continue;
  }

  //현재 문자가 변경된 알파벳에서 시작 알파벳이 일치할 경우
  let isMatch = false;
  //시작 알파벳에 해당하는 알파벳들을 체크
  for (const alphabet of alphabetArr) {
    const slicedStr = str.slice(i, i + alphabet.length);
    if (alphabet === slicedStr) {
      isMatch = true;
      count++;
      i += alphabet.length - 1;
      break;
    }
  }
  //변경된 알파벳에서 일치하는것이 없을경우
  if (!isMatch) {
    count++;
  }
}

console.log(count);
