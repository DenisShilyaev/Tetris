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

//В цикле ниже перебираем все ячейки в массиве и присваиваем каждой ячейке уникалные координаты
for (let y = 18; y > 0; y--) {
	for (let x = 1; x < 11; x++) {
		excel[i].setAttribute('posX', x); 
		excel[i].setAttribute('posY', y);
		i++;
	}	
}

let x = 5, y = 10; //Задаем начальные координаты отрисовки фигуры
let mainArr = [
	//Палка
	[
		[0, 1],
		[0, 2],
		[0, 3]
	]
	//Квадрат
		[1, 0],
		[0, 1],
		[1, 1]
]

let currentFigure = 0;
let figureBody = 0;

function create () {
	function getRandom () {
		return Math.round(Math.random()*(mainArr.length-1))
	}

	currentFigure = getRandom;

	figureBody = [
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`)
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`)
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
	
	
	]
	
}