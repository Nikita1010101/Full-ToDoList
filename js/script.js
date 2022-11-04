const inputName = document.querySelector('.name'),
    inputPreorety = document.querySelector('.preorety'),
    inputDescription = document.querySelector('.description'),
    inputDataTime = document.querySelector('.date-time');

const list = document.querySelector('.list')

const btnAct = document.querySelector('.btn-action'),
    btnAct2 = document.querySelector('.btn-action a')

const actOptions = document.querySelector('.act'),
    seeOptions = document.querySelector('.see'),
    sortOptions = document.querySelector('.sort')

const search = document.querySelector('.search')

let newData
let arrOptions = ['name', 'preorety', 'description', 'day', 'month']

let date = new Date()

function NewObj(name, preorety, description, day, month) {
    this.name = name
    this.preorety = preorety
    this.description = description
    this.day = day
    this.month = month
}

arrItems = [
    {
        'name': 'Ремонт',
        'preorety': '9',
        'description': 'Поеклеить обои',
        'day': '24',
        'month': '11'
    },
    {
        'name': 'Учёба',
        'preorety': '8',
        'description': 'Сделать домашнее задание',
        'day': '05',
        'month': '11'
    },
    {
        'name': 'Уборка',
        'preorety': '4',
        'description': 'Выбросить мусор',
        'day': '04',
        'month': '11'
    },
    {
        'name': 'Магазин',
        'preorety': '7',
        'description': 'Купить хлеб',
        'day': '10',
        'month': '11'
    },
    {
        'name': 'Тренировка',
        'preorety': '4',
        'description': 'Сделать 50 подтягиваний',
        'day': '30',
        'month': '11'
    },
    {
        'name': 'Прогуляться парку',
        'preorety': '5',
        'description': 'погулять с собакой',
        'day': '08',
        'month': '11'
    }

]

const printItems = (arr, mode) => {
    list.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        list.innerHTML += `
            <div class="item">
                <div class="main">
                    <div class="name"><span>Название: </span>${arr[i].name}</div>
                    <div class="preorety"><span>Приоритет: </span>${arr[i].preorety}</div>
                    <div class="description"><span>Описание: </span>${arr[i].description}</div>
                    <div class="date-time"><span>Дата и время: </span>${arr[i].day}.${arr[i].month}</div>
                </div>
                <div class="btn">
                    <a class="delete" href="javascript:void(0)">Удалить</a>
                    <input class="radio ${!mode ? 'edit' : ''}" name="radio" type="radio">
                </div>
            </div>
        `
    }
}

const checkInputs = () => {
    let str1 = inputName.value,
        str2 = inputPreorety.value,
        str3 = inputDescription.value,
        str4 = inputDataTime.value;
    let strsArr = [str1, str2, str3, str4];
    let space = 0, alpha = 0;
    for (let str of strsArr) {
        if (str.length == 0) {
            alert('Заполните все поля для ввода!');
            return false;
        }
        for (let len = 0; len < str.length; len++) {
            if (str[len] == ' ') space++;
            else alpha++;
        }
        if (space > alpha / 2) {
            alert('Заполните корректно все поля для ввода!');
            return false;
        }
    }
    let newStr = str4.split('.')
    if (!Number.isInteger(parseInt(str2)) || !Number.isInteger(parseInt(str4))) {
        alert('Введите числа в 2 и 4 инпут!');
        return false;
    }
    else if (newStr[1] < date.getMonth() + 1 || newStr[1] > 12 || (date.getMonth() + 1 == newStr[1] && date.getDate() > newStr[0])) {
        alert('Введите корректные даты!')
        return false
    }
    else if (newStr[1] > date.getMonth() + 2 || (newStr[1] == date.getMonth() + 2 && newStr[0] > date.getDate())) {
        alert('Введите дату, ранее месяца после, текущей даты!')
        return false
    }
    return true
}

const clearInputs = () => {
    inputName.value = ''
    inputPreorety.value = ''
    inputDescription.value = ''
    inputDataTime.value = ''
}

const Input = index => {
    inputName.value = arrItems[index].name
    inputPreorety.value = arrItems[index].preorety
    inputDescription.value = arrItems[index].description
    inputDataTime.value = `${arrItems[index].day}.${arrItems[index].month}`
}

const add = () => {
    let name = inputName.value.slice(0, 1).toUpperCase() + inputName.value.slice(1),
        preorety = inputPreorety.value,
        description = inputDescription.value.slice(0, 1).toUpperCase() + inputDescription.value.slice(1),
        data = inputDataTime.value
    newData = data.split('.')
    arrItems.push(new NewObj(name, preorety, description, newData[0], newData[1]))
}

const edit = () => {
    let items2 = document.querySelectorAll('.btn input')
    for (let i = 0; i < items2.length; i++) {
        if (items2[i].checked) {
            console.log(arrItems[i])
            arrItems[i].name = inputName.value.slice(0, 1).toUpperCase() + inputName.value.slice(1)
            arrItems[i].preorety = inputPreorety.value
            arrItems[i].description = inputDescription.value.slice(0, 1).toUpperCase() + inputDescription.value.slice(1)
            newData = inputDataTime.value.split('.')
            arrItems[i].day = newData[0]
            arrItems[i].month = newData[1]
        }
    }
}

const seeBy = index => {
    let newArr, newStr, curD
    if (index == 1) {
        newArr = arrItems.filter(item => {
            curD = date.getDate()
            date.setMonth(date.getMonth() + 1)
            if (date.getDate(0) - 7 < curD) {
                for (let i = 0; i < 7; i++) {
                    if (parseInt(item['day']) == i + curD) {
                        return true
                    }
                }
            }
            else {
                for (let j = curD; j < date.getDate(0) - curD + 1; j++) {
                    if (parseInt(item['day']) == j) {
                        return true
                    }
                }
                for (let j = 0; j < 7 - (date.getDate(0) - curD + 1); j++) {
                    if (parseInt(item['day']) == j + 1) {
                        return true
                    }
                }
            }
        })
    }
    else {
        newArr = arrItems.filter(item => {
            if (date.getDate() == item['day']) {
                return true
            }
        })
    }
    return newArr
}

const sortBy = index => {
    let newArr;
    return newArr = index == 0 ? arrItems.sort((a, b) => b['preorety'] - a['preorety'])
        : arrItems.sort((a, b) => parseInt(a['month'] + a['day']) > parseInt(b['month'] + b['day']) ? 1 : -1)
}

const searchBy = () => {
    let newArr = [];
    for (let i = 0; i < arrItems.length; i++) {
        for (let j = 0; j < arrOptions.length; j++) {
            arrItems[i][arrOptions[j]].toLowerCase().includes(search.value.toLowerCase()) ? newArr.push(arrItems[i]) : 0
        }
    }
    return newArr
}

btnAct.addEventListener('click', () => {
    if (checkInputs()) {
        if (actOptions.selectedIndex == 0) {
            add()
            printItems(arrItems, actOptions.selectedIndex == 1 ? true : false)
            clearInputs()
        }
        else {
            edit()
            printItems(arrItems, actOptions.selectedIndex == 1 ? true : false)
            clearInputs()
        }
        printItems(sortBy(sortOptions.selectedIndex), actOptions.selectedIndex == 1 ? true : false)
    }
})

actOptions.addEventListener('click', () => {
    let radioBtns = document.querySelectorAll('.radio')
    if (actOptions.selectedIndex == 0) {
        btnAct2.innerHTML = 'Добавить'
        for (let i = 0; i < radioBtns.length; i++) {
            radioBtns[i].classList.add('edit')
        }

    }
    else {
        btnAct2.innerHTML = 'Редактировать'
        for (let i = 0; i < radioBtns.length; i++) {
            radioBtns[i].classList.remove('edit')
        }
    }
})

seeOptions.addEventListener('click', () => {
    switch (seeOptions.selectedIndex) {
        case 0:
            printItems(sortBy(0), actOptions.selectedIndex == 1 ? true : false)
            break;
        case 1:
            printItems(seeBy(1), actOptions.selectedIndex == 1 ? true : false)
            break;
        case 2:
            printItems(seeBy(2), actOptions.selectedIndex == 1 ? true : false)
            break;
    }
})

sortOptions.addEventListener('click', () => {
    if (sortOptions.selectedIndex == 0) {
        printItems(sortBy(0), actOptions.selectedIndex == 1 ? true : false)
    }
    else {
        printItems(sortBy(1), actOptions.selectedIndex == 1 ? true : false)
    }
})

search.addEventListener('input', () => {
    printItems([...new Set([] = searchBy())], actOptions.selectedIndex == 1 ? true : false)
})

list.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {

        let btns = document.querySelectorAll('.delete')
        console.log(event.target)
        for (let i = 0; i < btns.length; i++) {
            if (event.target == btns[i]) {
                arrItems.splice(i, 1);
                printItems(arrItems, actOptions.selectedIndex == 1 ? true : false)
            }
        }
    }
    if (event.target.classList.contains('radio')) {
        let items = document.querySelectorAll('.btn input')
        for (let i = 0; i < items.length; i++) {
            if (items[i].checked) {
                Input(i)
            }
        }
    }
})

printItems(sortBy(0), actOptions.selectedIndex == 1 ? true : false)