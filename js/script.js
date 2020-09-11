const filterByType = (type, ...values) => values.filter(value => typeof value === type), // создаем функцию filterByType, в нее передаем нужный тип данных и массив значений, значения фильтруются по указанном типу
	hideAllResponseBlocks = () => { //создаем функцию hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //в переменную responseBlocksArray записываем массив элементов div с классом dialog__response-block
														// (поля с ответом приложения)
		responseBlocksArray.forEach(block => block.style.display = 'none'); // делаем невидимыми все полученные элементы в responseBlocksArray 
	}, // ну тут нечего сказать...

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // создаем функцию showResponseBlock, передаем аргументы blockSelector, msgText, spanSelector
		hideAllResponseBlocks(); // вызываем функцию hideAllResponseBlocks, которая делает объект невидимым
		document.querySelector(blockSelector).style.display = 'block'; // получаем объект с селектором blockSelector и задаем ему свойство display: 'block'
		if (spanSelector) { // задаем условие, если существует spanSelector, то
			document.querySelector(spanSelector).textContent = msgText; // получаем элемент с селектором spanSelector и присваеваем ему текстовое значение msgText
		} // ну тут нечего сказать...
	}, // ну тут нечего сказать...

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // создаем функцию showError, в которую принимаем аргумент msgText, вызываем функцию showResponseBlock для 
												      // ошибки
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // создаем функцию showResults, в которую принимаем аргумент msgText, вызываем функцию showResponseBlock для
												 // результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // создаем функцию showNoResults, внутри вызываем функцию showResponseBlock для 
									 	 // отсутствия результата

	tryFilterByType = (type, values) => { // создаем функцию tryFilterByType, передаем аргументы type, value
		try { // создаем конструкцию try {} catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // создаем valuesArray, выполняем filterByType, конкатенируем значения массива values в строку
												// с разделитилем ", "
			const alertMsg = (valuesArray.length) ? // создаем переменную alertMsg, в которую записываем результат выполнения тернарного оператора, с условием существования строки valuesArray
				`Данные с типом ${type}: ${valuesArray}` : // если  существует, то записываем сообщение с результатами
				`Отсутствуют данные типа ${type}`; // если не существует, то записываем сообщение об отсутствии результатов
			showResults(alertMsg); // вызваем showResults, передаем аргумент alertMsg
		} catch (e) { // ловим ошибку, если она есть, то
			showError(`Ошибка: ${e}`); // вызываем showError с информацией об ошибке
		} // ну тут нечего сказать...
	}; // ну тут нечего сказать...

const filterButton = document.querySelector('#filter-btn'); //создаем переменную filterButton, в которую передаем элемент с id = filter-btn

filterButton.addEventListener('click', e => { // добавляем обработчик событий на filterButton на событие клик, в collback передаем событие
	const typeInput = document.querySelector('#type'); // создаем typeInput, записываем элемент с id = type
	const dataInput = document.querySelector('#data'); // создаем dataInput, записываем элемент с id = data

	if (dataInput.value === '') { // если значение инпута dataInput = пустой строке
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // задаем сообщение, если пользователь оставил поле пустым
		showNoResults(); // вызываем showNoResults (нет результатов)
	} else { // иначе
		dataInput.setCustomValidity(''); //если пользователь ввел данные, убираем сообщение валидации
		e.preventDefault(); // отменяем стандартное поведение браузера на event
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываем tryFilterByType, передаем значения type и data инпутов без лишних пробелов
	} // ну тут нечего сказать...
}); // ну тут нечего сказать...

