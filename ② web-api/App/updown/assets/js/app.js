
// index.html에는 app.js(현재파일)이 import가 되어있다.
// 현재 파일을 실행부로 취급해서 각각의 기능은 파일별로 따로 구현

import gameStart from './start.js';
// import {x, name} from './start.js';

(function () {
  gameStart();
})();