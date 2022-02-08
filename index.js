const fs = require("fs");
const readline = require('readline');
const readFileByLine = async function (path, callback) {
	return new Promise(async (resolve) => {
		const fileStream = fs.createReadStream(path);
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity
		});
		for await (const line of rl) {
			// Each line in input.txt will be successively available here as `line`.
			callback(Number(line))
		}
		resolve();
	})
}
//Последовательность данных не всегда нужно сохранять в памяти.
// Поэтому нужно уметь обрабатывать последовательность по мере поступления ее элементов: при чтении файла, при вводе некоторых данных с клавиатуры и т.д.
// Пусть имеется последовательность произвольных целых ненулевых чисел, завершающаяся числом 0 (число 0 в последовательность не входит). Количество элементов в последовательности заранее неизвестно, поэтому в данной работе использовать массивы (статические и динамические) нельзя.
// B12. Найти такие элементы (а также их сумму), которые состоят только из четных цифр.


const lab4 = new (class Lab4 {
	sum = 0;
	evenNumbers = [];
	async init(){
		// Читаем файл с последовательностью чисел и находим четные цифры
 		await readFileByLine('./testCasesFor4Lab.txt', this.startTestCase.bind(this))

	}
	findEvenNumbersAndSumm = (number) => {
		const numberArray = [...number.toString()].map(Number);
		let evenNumbersCount = 0
 		numberArray.forEach((singleNumber) => {
			if (singleNumber % 2 === 0) {
				evenNumbersCount++
			}
		})
			if (evenNumbersCount === numberArray.length) {
				this.sum+=number
				this.evenNumbers.push(number);
			}
	}

	startTestCase(number) {
		if (number === 0) {
			console.log(`Сумма четных цифр ${this.sum}`)
			console.log(`Четные цифры в последовательность ${this.evenNumbers}`)
			return
		}
		this.findEvenNumbersAndSumm(number);

	}
})();

//Требуется определить массив целых чисел (например, размера 30),
// заполнить его случайными числами (в диапазоне от A до B, где A и B задаются в директивах #define) или ввести его элементы с клавиатуры и
// определить его характеристики в соответствии с вариантом.
// Программа должна содержать следующие функции:
// • инициализация элементов массива случайными числами или вводимыми с клавиатуры;
// • вывод массива на экран

// B12. Напечатать индексы элементов массива и сами элементы, сумма цифр
// которых кратна индексу этого элемента

const lab5 = new (class Lab5 {
	A = -100;
	B = 150;
	arrayLength = 150;
	arrayOfNumbers = [];
	result = []

	randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}

	init() {
		for (let i = 0; i < this.arrayLength; i++) {
			this.arrayOfNumbers.push(this.randomInteger(this.A, this.B));
		}
		this.findEvenElements();
	}

	findEvenElements() {
		this.arrayOfNumbers.forEach((number, index) => {
			const numberArray = [...number.toString()].map(Number);
			const sum = numberArray.reduce((acc,cur) =>{
				return acc+cur
			})
			if (sum % index === 0) {
					this.result.push({
						index: index,
						number: number,
					})
			}
		})
		console.log(this.result)
	}
 })()

//Требуется определить массив целых чисел (например, размера 30),
// заполнить его случайными числами (в диапазоне от A до B, где A и B задаются в директивах #define) или ввести его элементы с клавиатуры. Найти
// минимальный элемент массива из всех элементов, обладающих свойством
// Q. Все элементы массива, обладающие свойством T, заменить на их обратные изображения (например, 123 заменить на 321). Отсортировать массив
// по возрастанию. После инициализации и каждого преобразования выводить массив на экран. Свойства Q и T задаются в вариантах задания.
//B12. Q: число начинается с 3. T: число является составным.
const lab6 = new (class Lab6 {
	A = -100;
	B = 150;
	arrayLength = 30;
	arrayOfNumbers = [];
	minQ = 0;

	randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}

	init() {
		for (let i = 0; i < this.arrayLength; i++) {
			this.arrayOfNumbers.push(this.randomInteger(this.A, this.B));
		}
		console.log('Массив с рандомными числами = ', this.arrayOfNumbers)
		this.findNumberStartsWithThree();
		this.findCompositeNumber();
	}

	findNumberStartsWithThree() {
		const arrayQ = this.arrayOfNumbers.filter((number)=> {
			const numberArray = [...number.toString()].map(Number);
			if (isNaN(numberArray[0])) numberArray[0] = '-'
			if (numberArray[0]=== 3 || (numberArray[0] === '-' && numberArray[1] === 3)) {
				return number;
			}
		})

		console.log('Все числа начинающиеся на 3 =' ,arrayQ)

		this.minQ = Math.min(...arrayQ);
		console.log('Минимальное число по условию Q =' ,this.minQ)
	}

	findCompositeNumber() {
		let i = 1
		const arrayT = this.arrayOfNumbers.filter((number)=> {
			i = 1
			while (i < number) {
				i++
				if ((number % i === 0 && number !== i && i !==1)) {
					return number
				}
			}
		})
		console.log('Составные числа = ' , arrayT)
		this.reverseCompositeNumbers(arrayT)
	}

	reverseCompositeNumbers(array) {
			const reversedArrayT = array.map((number)=> {
				const numberArray = [...number.toString()].map(Number);
				const reversedNumberArray = numberArray.reverse();
				return Number(String(reversedNumberArray).replace(/,/g, ''));
			})

		console.log('Перевернутые составные числа = ', reversedArrayT)
		const reversedAndSortArrayT = reversedArrayT.sort((a, b) => a - b);

		console.log('Перевернутые составные числа отсортированные по возрастанию =', reversedAndSortArrayT)

	}
})()

// Выделить в строке-предложении s все слова, разделенные символами-разделителями «_.,;:\n\t!?». Обработать выделенные слова в соответствии с вариантом задания.
// Регулярное слово – слово, состоящее только из больших латинских букв.
// Палиндром – это слово, которое одинаково читается слева направо и справа налево.
// Алфавитный порядок задается таблицей ASCII.

// B12. Напечатать все слова, которые начинаются с большой буквы и заканчиваются заданным двухбуквенным подсловом.
// Определить количество слов, содержащих согласные латинские буквы, и напечатать порядковые номера этих слов.



const lab7 = new (class Lab7 {
	subword = 'da'
	init() {
		const testString = 'sda Sada.da?dassq1313d;a24,da?dade43!1asfgghuikj;aaaaaaaaa;aAFD!FDFDS?DAdda,iuijkjda,aaaaaa,aaaaaaaaa,aaaaaaaaa,aaaaaaaa,ooooooo,adaaaaaaaaaa'
		const splitedArr = testString.split(/\s|\.|,|;|:|\n|\t|!|\?/gm)
		this.findCapitalLetter(splitedArr)
		this.findConsonants(splitedArr)
	}

	findCapitalLetter(splitedArr) {
		splitedArr.forEach((word) => {
				if ([...word][0].match(/[A-Z]+/g) && [...word][word.length - 2] === [...this.subword][0] && [...word][word.length - 1] === [...this.subword][1]) {
					console.log('Все слова, которые начинаются с большой буквы и заканчиваются двухбуквенным подсловом `da` = ', word)
				}
		})
	}

	findConsonants(splitedArr) {
		const result = []
		splitedArr.forEach((word, index) => {
			if (word.match(/[^A,E,I,O,U,Y,a,e,i,o,u,y]+/g)) {
				result.push({['Слово']: word, ['Порядковый номер (если считать нормально)']: index + 1})
			}
		})

		console.log(result)
	}
})()

//Требуется определить двумерный массив целых чисел (например, размера 5×7), заполнить его случайными числами (в диапазоне от A до B,
// где A и B задаются в директивах #define) или ввести его элементы с клавиатуры и преобразовать массив в соответствии с вариантом.
// Программа должна содержать следующие функции:
// • инициализация элементов двумерного массива случайными числами
// или вводимыми с клавиатуры;
// • вывод двумерного массива на экран
//B12. В логическом квадратном массиве порядка 8, моделирующем шахматную доску, значениям 1 соответствуют клетки, на которых расположены фигуры слона, 0 соответствует пустой клетке. Определить, сколько
// имеется на доске фигур, угрожающих другим, и удалять их с доски до тех
// пор, пока слоны не будут угрожать друг другу. Напечатать количество
// оставшихся фигур. Результирующий массив вывести на экран.

const lab8 = new (class Lab8{
	randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}
	init() {
		const arrayLength = 5;
		const arrayWidth = 7;
		const twoDimensionalArray = this.makeTwoDimensionalArray(arrayLength, arrayWidth)
		console.log('Двумерный массив = ', twoDimensionalArray)
		this.makeTwoDimensionalWithElephant();

	}

	makeTwoDimensionalArray(arrayLength, arrayWidth, min = 5, max = 8) {
		const twoDimensionalArray = []
		for (let i = 0; i < arrayLength; i++) {
			twoDimensionalArray.push((()=> {
				const arrayOfNumbers = []
				for (let i = 0; i < arrayWidth; i++) {
					arrayOfNumbers[i] =this.randomInteger(min, max);
				}
				return arrayOfNumbers
			})())
		}
		return twoDimensionalArray
	}

	makeTwoDimensionalWithElephant() {
		const min = 0;
		const max = 1;
		const arrayLength = 8
		const arrayWidth = 8
		const twoDimensionalArrayWithElephant = this.makeTwoDimensionalArray(arrayLength,arrayWidth,min,max);
		this.killElephant(twoDimensionalArrayWithElephant)
	}

	killElephant(array) {
		const elephantArray =	[...array]
		const _passThrough = (externalIndex, nestedIndex, direction) => {
			if (elephantArray[externalIndex]) {
					if (elephantArray[externalIndex][nestedIndex]) {
						if ( elephantArray[externalIndex][nestedIndex] === 1) {
							return true
						} else {
							return _passThrough(externalIndex +1, direction ==='left' ? nestedIndex - 1: nestedIndex +1, direction);
						}
					} else {
						return false
					}
			} else {
				return false
			}
		}

		for (let i = 0; i < elephantArray.length; i++) {
			const nestedArr = elephantArray[i];
			for (let j = 0; j < nestedArr.length; j++) {
				if (nestedArr[j] === 1) {
					if (_passThrough(i + 1, j - 1, 'left') || _passThrough(i + 1, j + 1, 'right')) {
						nestedArr[j] = 0
					}
				}
			}
			elephantArray[i] = nestedArr;
		}

		let count = 0

		for (let i = 0; i <elephantArray.length; i++) {
			const nestedArr = elephantArray[i];
			count += nestedArr.filter((value) => value > 0).length
		}

		console.log('Осталось фигур:', count)
	}
})()

// Требуется определить массив целых чисел (например, размера 30),
// заполнить его случайными числами или ввести его элементы с клавиатуры
// и определить его характеристики с помощью рекурсивной функции в соответствии с вариантом задания. Проверку правильности результата провести с помощью сравнения результатов итеративной и рекурсивной функций.
// 	Программа должна содержать следующие функции:
// 	•инициализация элементов массива случайными числами или вводимыми с клавиатуры;
// • вывод массива на экран;
// • итеративная функция, вычисляющая характеристики массива в
// соответствии с вариантом задания;
// • рекурсивная функция, вычисляющая характеристики массива в
// соответствии с вариантом задания

// A12. Найти минимальный элемент целочисленного массива с помощью рекурсии

const lab9 = new (class Lab9{
	A = 1;
	B = 100;
	arrayLength = 30;
	startWithThree = [];
	result = []

	randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}

	init() {
		const arrayOfNumbers = [];
		for (let i = 0; i < this.arrayLength; i++) {
			arrayOfNumbers.push(this.randomInteger(this.A, this.B));
		}
		console.log('Массив чисел = ', arrayOfNumbers)
		const minimumIterative = this.findMinumumNumberIterative(arrayOfNumbers);
		console.log('Минимальное значение массива итеративно = ', minimumIterative)
		const minimumRecursion = this.findMinimumNumberRecursion(arrayOfNumbers)[0]
		console.log('Минимальное значение массива рекурсивно = ', minimumRecursion)
	}

	findMinumumNumberIterative(arr) {
		for (let j = arr.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (arr[i] > arr[i + 1]) {
					let temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
				}
			}
		}
		return arr[0];
	}

	findMinimumNumberRecursion(arr) {
		if (arr.length === 0) {
			return []
		};
		let left = [];
		let right = [];
		let pivot = arr[0];
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < pivot) {
				left.push(arr[i]);
			} else {
				right.push(arr[i]);
			}
		}
		return this.findMinimumNumberRecursion(left).concat(pivot, this.findMinimumNumberRecursion(right));
	}
})()

lab9.init();


