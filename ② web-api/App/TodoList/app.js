// 

// 일정 데이터가 들어있는 배열 선언
const todos = [{
    id: 1,
    text: '할 일 1',
    done: false // 체크박스를 클릭해서 할 일을 마쳤는지의 여부
  },
  {
    id: 2,
    text: '할 일 2',
    done: false
  },
  {
    id: 3,
    text: '할 일 3',
    done: false
  }
];

// 화면에 표현할 li.todo-list-item 노드를 생성하는 함수 정의
function makeNewTodoNode(newTodo) {
  const $todoList = document.querySelector('.todo-list');

  // li
  const $newTodoNode = document.createElement('li');
  $newTodoNode.setAttribute('data-id', newTodo.id);
  $newTodoNode.classList.add('todo-list-item');
  $todoList.appendChild($newTodoNode);

  // for(let $ele of [$label, $modify, $remove]) {
  //   $newTodoNode.appendChild($ele);
  // }


  // label
  const $label = document.createElement('label');
  $label.classList.add('checkbox');
  $newTodoNode.appendChild($label);

  // label checkbox
  const $checkbox = document.createElement('input');
  $checkbox.type = 'checkbox';
  $label.appendChild($checkbox);

  // label text
  const $text = document.createElement('span');
  $text.classList.add('text');
  $text.textContent = newTodo.text;
  $label.appendChild($text);


  // modify
  const $modify = document.createElement('div');
  $modify.classList.add('modify');
  $newTodoNode.appendChild($modify);

  const $undo = document.createElement('span');
  $undo.classList.add('lnr', 'lnr-undo');
  $modify.appendChild($undo);


  // remove
  const $remove = document.createElement('div');
  $remove.classList.add('remove');
  $newTodoNode.appendChild($remove);

  const $crossCircle = document.createElement('span');
  $crossCircle.classList.add('lnr', 'lnr-cross-circle');
  // = $crossCircle.className = 'lnr lnr-cross-circle');
  $remove.appendChild($crossCircle);

}



// // 추가될 할 일 객체의 id를 생성해주는 함수 정의
// function makeNewID() {
//   if (todos.length > 0) {
//     // 배열 내의 할일 객체 중 마지막 객체의 id보다 하나 크게
//     return todos[todos.length-1].id + 1;
//   } else {
//     // 할일 객체가 하나도 없는 경우 id가 1
//     return 1;
//   }
// }

// // 이거 이후에 밑 2번의 id에 makeNewID(); 넣고
// // $li.dataset.id = newTodo.id; 를 위의 li태그에 넣어줘야함


// ------------------------------------------------------------

// 할 일 추가 처리 함수 정의
function insertTodoData() {

  // 사용자가 작성한 할 일 input 요소 얻기
  const $todoText = document.getElementById('todo-text');

  // 1. 입력값이 없다면 추가 처리하지 않는다.
  // 공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교
  // 공백 제거 함수 : trim() === '';
  // 입력값이 공백이라면 background : orange / placeholder : 필수 입력 사항입니다.
  if ($todoText.value.trim() === '') {
    $todoText.style.backgroundColor = 'orangered';
    $todoText.placeholder = '필수 입력사항입니다.';
    $todoText.value = '';
    return;
  }
  // 2. todos 배열에 객체를 직접 생성한 후 추가(id 추가 순서대로)

  const newTodo = {
    id: todos.length + 1,
    text: $todoText.value,
    done: false
  };
  todos.push(newTodo);


  // 3. 추가된 데이터를 화면에 표현 (li 태그 추가)
  makeNewTodoNode(newTodo);


  // 4. 입력 완료 후 input에 존재하는 문자열 제거
  $todoText.value = '';
  $todoText.style.backgroundColor = '#495057';
  $todoText.placeholder = '할 일을 입력하세요';

}


// -------------------------------------------------------------------

// data-id값으로 배열을 탐색해 일치하는 객체가 들어있는 인덱스 반환
function findIndexByDataID(dataId) {
  for (let i = 0; i < todos.length; i++) {
    if (dataId === todos[i].id) {
      return i;
    }
  }
}


// 할 일 완료 처리 수행할 함수
function changeCheckState($label) {

  /*
  할 일이 완료된 노드의 클래스 이름 추가(디자인)
  클래스명 checked 추가. 할 일 완료는 껐다가 켰다가 해야 함
  toggle인듯
  */

  $label.lastElementChild.classList.toggle('checked');


  /*
  전역 변수로 선언한 배열 안의 객체의 done 값 수정하기
  false -> true
  data-id를 얻어서 그와 일치하는 객체의 done 값을 true로 바꾸기
  기존의 값이 true면 false로 바꾸기
  */

  const dataId = +$label.parentNode.dataset.id;
  const index = findIndexByDataID(dataId);

  todos[index].done = !todos[index].done;
}

// 할 일 삭제 처리 함수 정의
function removeTodoData($delTarget) {

  // 애니메이션 적용을 위해 클래스 추가 (delMoving)
  $delTarget.classList.add('delMoving');

  // ul 안에 있는 li를 RemoveChild로 제거하기 전에 애니메이션 발동 및
  // 배열 내부 객체 삭제가 진행될 수 있도록 시간을 일부러 지연
  // 1.5초 지연 (시간을 지연하는 window 함수)
  setTimeout(() => {
    document.querySelector('.todo-list').removeChild($delTarget);
  }, 1000);

  // 배열 내에 있는 객체도 삭제
  // 삭제되는 개체가 배열 안에 몇번째인지 확인 -> 할 일 완료 처리 함수에 비슷한 로직 있음
  // 함수화시키기

  const index = findIndexByDataID(+$delTarget.dataset.id);
  todos.splice(index, 1);

  console.log(todos);
  // 해야하나?



  // $delTarget.classList.add('delMoving');
  // setTimeout(() => $delTarget.remove(), 1000);

}


// 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan) {

  // 수정 모드 진입 버튼 교체 (lnr lnr-checkmark-circle)
  $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

  // span.text를 input태그로 교체 (replaceChild)
  // input 태그에는 .modify-input을 추가시키고
  // input에는 기존의 할 일 텍스트가 미리 작성이 되어있어야 함
  const $label = $modSpan.parentNode.previousElementSibling;
  const $textSpan = $label.lastElementChild;

  const $modInput = document.createElement('input');

  $modInput.classList.add('modify-input');
  $modInput.setAttribute('value', $textSpan.textContent); // 기존 할 일 text를 input에 세팅

  $label.replaceChild($modInput, $textSpan);
}

// 수정 완료 이벤트 처리 함수
function modifyTodoData($modSpan2) {
  $modSpan2.classList.replace('lnr-checkmark-circle', 'lnr-undo');

  const $label = $modSpan2.parentNode.previousElementSibling;
  const $textInput = $label.lastElementChild;

  const $endSpan = document.createElement('span');

  $endSpan.classList.add('text');
  $endSpan.textContent = $textInput.value;

  $label.replaceChild($endSpan, $textInput);

}


// 메인 역할을 하는 즉시 실행 함수
(function () {

  // 할 일 추가 이벤트
  const $addBtn = document.getElementById('add');
  $addBtn.addEventListener('click', e => {

    // form 태그 안의 button은 type를 명시하지 않으면 자동으로 submit이 동작함
    e.preventDefault(); // 버튼의 고유기능(submit)을 중지

    insertTodoData();

  });
  // 할 일 완료(체크박스) 이벤트
  const $UlTodo = document.querySelector('ul.todo-list');

  $UlTodo.addEventListener('click', e => {
    if (!e.target.matches('input[type=checkbox')) {
      return; // 체크박스에서만 이벤트가 동작하게 처리
    }

    changeCheckState(e.target.parentNode); // label을 함수의 매개값으로 전달
  });


  // 할 일 삭제 이벤트
  const $delTodo = document.querySelector('ul.todo-list');
  $delTodo.addEventListener('click', e => {
    if (!e.target.matches('.todo-list .remove span')) {
      return;
    }
    removeTodoData(e.target.parentNode.parentNode);
  });



  // 할 일 수정 이벤트 (수정 모드 진입 / 수정 완료)
  const $modTodo = document.querySelector('ul.todo-list');
  $modTodo.addEventListener('click', e => {
    if (e.target.matches('.todo-list .modify span.lnr-undo')) {
      enterModifyMode(e.target); // 수정 모드 진입
    } else if (e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
      modifyTodoData(e.target); // 수정 완료
    } else return;
  });

})();