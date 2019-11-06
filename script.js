let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;//Скорость падения фигуры

modal.addEventListener('click', function (e) {//Настраиваем уровни сложности
	if (e.target.classList.contains('easy')) {
		speed = 900;
	} else if (e.target.classList.contains('normal')) {
		speed = 600;
	} else if (e.target.classList.contains('hard')) {
		speed = 300;
	}

	if (e.target.classList.contains('button')) {//Делаем меню невидимым и начинаем игру после нажатия на любую кнопку в меню
		modal.style.display = 'none';
		overlay.style.display = 'none';
		startGame();
	}
})

function startGame() {


let tetris = document.createElement('div'); //Созаем div, который будет являтся игровым полем
tetris.classList.add('tetris'); //Присваиваем данному div класс 'tetris'

for (let i = 1; i < 181; i++) {
	let excel = document.createElement('div'); //Создаем 180 ячеек, которые будут являтся клетками игрового поля тетриса
	excel.classList.add('excel'); //Присваимваем каждой ячейке класс 'excel'
	tetris.appendChild(excel); //Добавляем каждую ячейку в родительскй div с классом 'tetris'
}

let main = document.getElementsByClassName('main')[0]; //создаем главный div с классом 'main'
main.appendChild(tetris); // добавляем 'tetris' в родительский div с классом 'main'

let excel = document.getElementsByClassName('excel'); //Заносим все ячейки в массив 'excel' 
let i = 0; //создаем переменную, которая будет являтся счетчиком ячеек массива excel

//В цикле ниже перебираем все ячейки в массиве и присваиваем каждой ячейке уникалные координаты (X, Y)
for (let y = 18; y > 0; y--) {
	for (let x = 1; x < 11; x++) {
		excel[i].setAttribute('posX', x); 
		excel[i].setAttribute('posY', y);
		i++;
	}	
}

let x = 5, y = 15; //Задаем начальные координаты отрисовки фигуры
let mainArr = [
	//Палка
	[
		[0, 1],
		[0, 2],
		[0, 3],
		//поворот на 90 градусов
		[
			[-1, 1],
			[0, 0],
			[1, -1],
			[2, -2],
		],
		//поворот на 180 градусов
		[
			[1, -1],
			[0, 0],
			[-1, 1],
			[-2, 2],
		],
		//поворот на 270 градусов
		[
			[-1, 1],
			[0, 0],
			[1, -1],
			[2, -2],
		],
		//поворот на 360 градусов
		[
			[1, -1],
			[0, 0],
			[-1, 1],
			[-2, 2],
		],
	],

	//Квадрат
	[
		[1, 0],
		[0, 1],
		[1, 1],
		//поворот на 90 градусов
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0],
		],
		//поворот на 180 градусов
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0],
		],
		//поворот на 270 градусов
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0],
		],
		//поворот на 360 градусов
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0],
		],
	],

	//Фигура L
	[
		[1, 0],
		[0, 1],
		[0, 2],
		//поворот на 90 градусов
		[
			[0, 0],
			[-1, 1],
			[1, 0],
			[2, -1],
		],
		//поворот на 180 градусов
		[
			[1, -1],
			[1, -1],
			[-1, 0],
			[-1, 0],
		],
		//поворот на 270 градусов
		[
			[-1, 0],
			[0, -1],
			[2, -2],
			[1, -1],
		],
		//поворот на 360 градусов
		[
			[0, -1],
			[0, -1],
			[-2, 0],
			[-2, 0],
		],
	],

	//Зеркальная фигура L
	[
		[1, 0],
		[1, 1],
		[1, 2],
		//поворот на 90 градусов
		[
			[0, 0],
			[0, 0],
			[1, -1],
			[-1, -1],
		],
		//поворот на 180 градусов
		[
			[0, -1],
			[-1, 0],
			[-2, 1],
			[1, 0],
		],
		//поворот на 270 градусов
		[
			[2, 0],
			[0, 0],
			[1, -1],
			[1, -1],
		],
		//поворот на 360 градусов
		[
			[-2, 0],
			[1, -1],
			[0, 0],
			[-1, 1],
		],
	],

	//Молния правая
	[
		[1, 0],
		[-1, 1],
		[0, 1],
		//поворот на 90 градусов
		[
			[0, -1],
			[-1, 0],
			[2, -1],
			[1, 0],
		],
		//поворот на 180 градусов
		[
			[0, 0],
			[1, -1],
			[-2, 0],
			[-1, -1],
		],
		//поворот на 270 градусов
		[
			[0, -1],
			[-1, 0],
			[2, -1],
			[1, 0],
		],
		//поворот на 360 градусов
		[
			[0, 0],
			[1, -1],
			[-2, 0],
			[-1, -1],
		],
	],

	//Молния левая
	[
		[1, 0],
		[1, 1],
		[2, 1],
		//поворот на 90 градусов
		[
			[2, -1],
			[0, 0],
			[1, -1],
			[-1, 0],
		],
		//поворот на 180 градусов
		[
			[-2, 0],
			[0, -1],
			[-1, 0],
			[1, -1],
		],
		//поворот на 270 градусов
		[
			[2, -1],
			[0, 0],
			[1, -1],
			[-1, 0],
		],
		//поворот на 360 градусов
		[
			[-2, 0],
			[0, -1],
			[-1, 0],
			[1, -1],
		],
	],

	//Деталь "танк"
	[
		[1, 0],
		[2, 0],
		[1, 1],
		//поворот на 90 градусов
		[
			[1, -1],
			[0, 0],
			[0, 0],
			[0, 0],
		],
		//поворот на 180 градусов
		[
			[0, 0],
			[-1, 0],
			[-1, 0],
			[1, -1],
		],
		//поворот на 270 градусов
		[
			[1, -1],
			[1, -1],
			[1, -1],
			[0, 0],
		],
		//поворот на 360 градусов
		[
			[-2, 0],
			[0, -1],
			[0, -1],
			[-1, -1],
		],
	],
]

let currentFigure = 0;//Определяет, какая фигура выбрана в текущий омент времени
let figureBody = [];//Тело текущей фигуры
let rotate = 1;//Определяет угол поворота фигуры

function create () { 
	function getRandom () {//Для случайного определения типа новой фигуры
		return Math.round(Math.random()*(mainArr.length-1))
	}

	rotate = 1;

	currentFigure = getRandom();

	figureBody = [ //Массив, в котором определяются координаты новой фигуры
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
	]
	
	for (let i = 0; i < figureBody.length; i++){//Присваиваем новой фигуре класс "figure", тем самым делая её видимой
		figureBody[i].classList.add('figure');
	}
}

create();

let score = 0;//Хранит количество набранных очков
let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки: ${score}`;

function move() {//Описваем движение фигуры
	let moveFlag = true;//Если true то фигура двигается вниз иначе фигура останавливается, меняет класс и создается новая фигура 
	let coordinates = [//Заволняем массив координатами фигуры
		[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
		[figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
		[figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
		[figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
	];

	for (let i = 0; i < coordinates.length; i++) {//Фигура останавливается если фигура достигает низа поля или фигура сталкивается с другой фигурой
		if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')) {
			moveFlag = false;
			break;
		}
	}

	if (moveFlag) {//Если true то фигура двигается вниз иначе фигура останавливается и создается новая фигура
		for (let i = 0; i < figureBody.length; i++) {//Делаем фигуру невидимой
			figureBody[i].classList.remove('figure')
		}
		figureBody = [//Двигаем фигуру вниз на 1
			document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1]-1}"]`),
			document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1]-1}"]`),
			document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1]-1}"]`),
			document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1]-1}"]`)
		];
		for (let i = 0; i < figureBody.length; i++) {//Делаем её снова видимой
			figureBody[i].classList.add('figure');
		}
	} else {
		for (let i = 0; i < figureBody.length; i++) {//Присваиваем фигуре класс "set"
			figureBody[i].classList.remove('figure');
			figureBody[i].classList.add('set');
		}
		//Ниже находим полностю заполненные строки, удаляем их и опускаем остальные элементы на стрку ниже
		for (let i =  1; i < 15; i++) {
			let count = 0;
			for (let k = 1; k < 11; k++){
				if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
					count++;
					if (count == 10){
						score += 10;
						input.value = `Ваши очки: ${score}`;
						for (let m = 1; m < 11; m++) {
						document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
						}
						let set = document.querySelectorAll('.set');
						let newSet = [];
						for (let s = 0; s < set.length; s++) {
							let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
							if (setCoordinates[1] > i){
								set[s].classList.remove('set');
								newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`))
							}
						}
						for (let a = 0; a < newSet.length; a++) {
							newSet[a].classList.add('set');
						}
						i--;
					}
				}
			}
		}
		for (let n = 1; n < 11; n++) {//Конец игры: Если остановившиеся фигуры доходят до верхней границы поля, то останавливаем игру и выводим сообщение 
			if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
				clearInterval(interval);
				alert(`Игра окончена. Ваши очки: ${score}`);
			}
		}
		create();
	}
}

let interval = setInterval(() => {//Цикл игры. Обпеделяем скорость обнослени поля.
	move();
}, speed);

let flag = true;

window.addEventListener('keydown', function (e) {//Обработка перемещения фигуры по нажатию клавишь

	let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
	let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
	let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
	let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

	function getNewState (a) {

		flag = true;

		let figureNew = [//Берем координаты новой фигуры с необходимым смещением
		document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
		document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
		document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
		document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
		];

		for (let i = 0; i < figureNew.length; i++) {//Ограничение перемещения. Не перемещаяем фигуру если она находится за границей поля или пересекается с другой фигурой
			if (!figureNew[i] || figureNew[i].classList.contains('set')) {
				flag = false;
			}
		}

		if (flag == true) {//Если проверка на перемещение пройдна
			for (let i = 0; i < figureBody.length; i++) {//Удаляем у фигуры класс "figure"
			figureBody[i].classList.remove('figure');
			}

		figureBody = figureNew; //Присваиваем текущей фигуре координаты новой фигуры

			for (let i = 0; i < figureBody.length; i++) {//Добавляем фигуре класс "figure"
			figureBody[i].classList.add('figure');
			}
		}
	}
	if (e.keyCode == 37){ //При нажатии на стрелку влево
		getNewState (-1); //Двигаем фигуру влево
	} else if (e.keyCode == 39) { //При нажатии на стрелку вправо 
		getNewState (1); //Двигаем фигуру вправо
	} else if (e.keyCode == 40){ //При нажатии на стрелку вниз 
		move(); //Ускоряем падение фигуры
	} else if (e.keyCode == 38){ //При нажатии на стрелку вверх поворачиваем фигуру

		flag = true;

		let figureNew = [//Определяем новую фигуру с кооринатами повернутой фигуры
		document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
		document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
		document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
		document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
		];

		for (let i = 0; i < figureNew.length; i++) { //Проверяем на столкновение с краем поля и другой фигурой
			if (!figureNew[i] || figureNew[i].classList.contains('set')) {
				flag = false;
			}
		}

		if (flag == true) {
			for (let i = 0; i < figureBody.length; i++) {//Удаляем у текущей фигуры класс "figure"
			figureBody[i].classList.remove('figure');
			}

			figureBody = figureNew; //Присваиваем текущей фигуре новые координаты

			for (let i = 0; i < figureBody.length; i++) {//Добавляем фигуре класс "figure"
			figureBody[i].classList.add('figure');
			}

			if (rotate < 4){
				rotate++;
			} else {
				rotate = 1;
			}
		}
	}
})

}