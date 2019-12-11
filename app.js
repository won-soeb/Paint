const canvas = document.querySelector('#jsCanvas'),
  ctx = canvas.getContext('2d'),
  colors = document.querySelectorAll('.jsColor'),
  range = document.querySelector('#jsRange'),
  mode = document.querySelector('#jsMode'),
  save = document.querySelector('#jsSave');
  /*초기값 설정 :
  JS측에서도 설정을 해주어야 한다. 그렇지 않으면 프로그램을 바로 실행할 경우
  문제가 생길 수 있다.*/
const INITIAL_COLOR = '#2c2c2c';//기본색상(검정)
const CANVAS_SIZE = 700;//크기(px)

canvas.width = CANVAS_SIZE;//가로
canvas.height = CANVAS_SIZE;//세로

ctx.fillStyle = 'white';//초기 바탕색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);//바탕색채우기 설정
ctx.strokeStyle = INITIAL_COLOR;//그리기 기본색
// ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;//선굵기 기본값

let painting = false,
  filling = false;
//플래그 : false로 설정하고 true여부에 따라 로직의 내용을 on/off처럼 사용할 수 있다

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {//커서의 좌표를 추적하는 함수
  const x = event.offsetX,
    y = event.offsetY;
  if (!painting) {//painting값이 거짓이면
    ctx.beginPath();//좌표를 찍고
    ctx.moveTo(x, y);//그 다음 좌표를 출력
  } else {//painting값이 참이면
    ctx.lineTo(x, y);//좌표값들을 선으로 잇고
    ctx.stroke();//설정에 따라 그린다
  }
}

function handleColorClick(event) {//색상변경
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;//나중에 바탕색을 함께 변경할 수 있도록 이 코드도 넣는다
}

function handleModeClick() {//채우기버튼 변환함수
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {//바탕색 채우기함수
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRangeChange(event) {//선굵기 조절함수
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleCM(event) { //마우스 우클릭 금지
  event.preventDefault();
}

function handleSaveClick() { //저장함수
  const image = canvas.toDataURL(),//이미지가 url주소화 된다
    link = document.createElement('a');
  link.href = image;
  link.download = 'image'; //저장할 파일이름
  link.click();//클릭이벤트 추가
}

if (canvas) {//캔버스에 직접 거는 이벤트
  canvas.addEventListener('mousemove', onMouseMove);
  //캔버스 내에서 커서의 좌표를 추적한다
  canvas.addEventListener('mousedown', startPainting);
  //마우스를 누르는 동안 그림을 그린다
  canvas.addEventListener('mouseup', stopPainting);
  //마우스를 떼면 그림그리는 것을 그만둔다
  canvas.addEventListener('mouseleave', stopPainting);
  //커서가 캔버스를 벗어나면 그림을 그리지 못하게 한다
  canvas.addEventListener('click', handleCanvasClick);
  //캔버스를 클릭하면 지정한 바탕색으로 채운다
  canvas.addEventListener('contextmenu', handleCM);
  //캔버스내부에서 마우스 우클릭을 금지시킨다
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick));//색상패널

if (range) {//선굵기 조절스크롤
  range.addEventListener('input', handleRangeChange);
}
if (mode) {//바탕색채우기/그리기 변환버튼
  mode.addEventListener('click', handleModeClick);
}
if (save) {//이미지저장버튼
  save.addEventListener('click', handleSaveClick);
}
