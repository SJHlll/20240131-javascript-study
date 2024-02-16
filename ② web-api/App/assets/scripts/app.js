// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 계산 이력을 모을 배열
const logEntries = [];

let seq = 0; // 로그 번호

// 입력칸에 입력한 숫자 읽기
const getUserNumberInput = () => +$userInput.value; // = perseInt($userInput.value);

// 계산 기능 담당 함수
const calculate = type => {

  // 계산 전 값 기억
  const originalResult = currentResult;
  const enteredNumber = getUserNumberInput();

  let mark;

  if (type === 'ADD') {
    mark = '+'
    currentResult += enteredNumber;
  } else if (type === 'SUB') {
    mark = '-'
    currentResult -= enteredNumber;
  } else if (type === 'MUL') {
    mark = 'x'
    currentResult *= enteredNumber;
  } else if (type === 'DIV') {
    mark = '/'
    currentResult /= enteredNumber;
  }

  // 연산식과 결과값을 두번째 section에 렌더링
  $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enteredNumber}`;
  $currentResultOutput.textContent = currentResult;

  // log 이력 쌓기
  writeToLog(mark, originalResult, enteredNumber, currentResult);


};

// 로그 이력 만들기
const writeToLog = (operation, prevResult, number, result) => {

  // 하나의 로그 객체 (연산타입, 이전결과, 연산숫자, 결과)
  const logObject = {
    operation,
    prevResult,
    number,
    result
  };
  logEntries.push(logObject);
  console.log(logEntries);

  // 화면에 로그를 li로 렌더링하는 함수 호출
  renderToLog(logObject);
};

// 로그 이력을 화면에 렌더링하는 함수
const renderToLog = ({operation : mark, prevResult, number, result}) => {

  // li 태그 생성
  const $newLi = document.createElement('li');
  $newLi.classList.add('log-entries-item');
  $newLi.textContent = `#${++seq}. ${prevResult} ${mark} ${number} = ${result}`;
  
  // ul에 추가
  $logEntries.appendChild($newLi);
};




// 연산 버튼 이벤트 핸들러
const addHandler = () => {
  calculate('ADD');
}

const subtractHandler = () => {
  calculate('SUB');
}

const multiplyHandler = () => {
  calculate('MUL');
}

const divideHandler = () => {
  calculate('DIV');
}

// 이벤트 핸들러 바인딩
$btnAdd.addEventListener('click', addHandler);
$btnSubtract.addEventListener('click', subtractHandler);
$btnMultiply.addEventListener('click', multiplyHandler);
$btnDivide.addEventListener('click', divideHandler);