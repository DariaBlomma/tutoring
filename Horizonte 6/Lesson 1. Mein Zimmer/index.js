let rightAnswers = 0,
    tryNumber = 1;
const renderCards = (name, list, attr) => {
    const div = document.createElement('div');
    if (list === 'empty') {
        div.dataset.name = attr;
    }
    div.className = `card ${list}-card`;
    div.textContent = name;
    document.querySelector(`.${list}-cards`).append(div);
};

const deCards = ['das Bild', 'das Poster', 'der Teppich', 'das Bett', 'der Kaktus', 'der Stuhl',
    'der Sessel', 'die Lampe', 'das Zimmer', 'der Boden', 'die Decke', 'die Tür', 'der Hund',
    'der Rucksack', 'die Wand', 'der Papierkorb', 'der Schreibtisch', 'der Bildschirm', 'das Regal',
    'das Buch', 'der Schrank', 'das Fenster'];
const ruCards = ['Картина', 'Постер', 'Ковер', 'Кровать', 'Кактус', 'Стул',
    'Кресло', 'Лампа', 'Комната', 'Пол', 'Потолок', 'Дверь', 'Собака', 'Рюкзак', 'Стена', 'Корзина для бумаг',
    'Письменный стол', 'Экран', 'Полка', 'Книга', 'Шкаф', 'Окно'];
const mixedCards = ['Картина', 'Постер', 'Ковер', 'Кровать', 'Кактус', 'Стул',
    'Кресло', 'Лампа', 'Комната', 'Пол', 'Потолок', 'Дверь', 'Собака', 'Рюкзак', 'Стена', 'Корзина для бумаг',
    'Письменный стол', 'Экран', 'Полка', 'Книга', 'Шкаф', 'Окно'];


const init = (showRight = false) => {
    if (showRight) {
        ruList.textContent = '';
        deList.textContent = '';
        emptyList.textContent = '';
        ruCards.forEach(item => {
            renderCards(item, 'ru');
        });
    } else {
        mixedCards.forEach(item => {
            renderCards(item, 'ru');
        });
    }
    deCards.forEach(item => {
        renderCards(item, 'de');
    });
    ruCards.forEach(item => {
        renderCards('', 'empty', item);
    });

    mixedCards.sort();


};
init();


const ruList = document.querySelector('.ru-cards'),
    emptyList = document.querySelector('.empty-cards'),
    deList = document.querySelector('.de-cards'),
    cardsDiv = document.querySelector('.cards'),
    reset = document.querySelector('.reset'),
    answersBtn = document.querySelector('.answers'),
    rightAnswersDiv = document.querySelector('.right-answers');
let numberSpan = document.querySelector('.number');

const renderTryInfo = () => {
    const div = document.createElement('div');
    div.className = 'try-info';
    div.innerHTML = `
    <b>Datum</b><span class="date"></span>
    <b>Versuch:</b><span class='try'>${tryNumber}</span>
    <b>Richtig:</b><span class="number">1</span>
    `;
    rightAnswersDiv.append(div);
};

answersBtn.addEventListener('click', event => {
    init(true);
});

reset.disabled = true;
reset.addEventListener('click', () => {
    ruList.textContent = '';
    deList.textContent = '';
    emptyList.textContent = '';
    init();
    const tryInfos = document.querySelectorAll('.try-info');
    const newTryDiv = tryInfos[tryInfos.length - 1];
    numberSpan = newTryDiv.querySelector('.number');
    tryNumber++;
    renderTryInfo();
});
const showCorrectness = (card, emptyCard) => {
    const attr = emptyCard.dataset.name;
    if (attr === card.textContent) {
        card.classList.add('right');
        rightAnswers++;
    } else {
        card.classList.add('wrong');
    }
};

ruList.addEventListener(`dragstart`, event => {;
    event.target.classList.add(`selected`);

});

emptyList.addEventListener(`dragend`, event => {
    event.target.classList.remove(`selected`);
});

emptyList.addEventListener('dragover', event => {
    event.preventDefault();
    const activeElement = document.querySelector('.selected');
    const currentElement = event.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`empty-card`);
    if (!isMoveable) {
        return;
    }

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.x + currentElementCoord.width / 2;
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.replaceWith(activeElement);
        return nextElement;
    };

    getNextElement(event.clientX, currentElement);
    showCorrectness(activeElement, currentElement);
    reset.disabled = ruList.children.length !== 0;
    numberSpan.textContent = rightAnswers;
    console.log('numberSpan: ', numberSpan);
});


// lesson2
const verbsList = document.querySelector('.lesson2 .ex2');
verbsList.addEventListener('click', event => {
    const target = event.target;
    if (!target.matches('.verbs')) {
        return;
    }
    if (target.textContent === 'heißen' || target.textContent === 'wohnen') {
        target.classList.add('wrong');
    } else {
        target.classList.add('right');
    }
});

// lesson3
const lesson3 = () => {
// answers radio: 1.hang 2.sit 3.lie
    const answersBtn = document.querySelector('.btn-radio'),
        radios = document.querySelectorAll('input[type="radio"]'),
        answersArr = ['hang', 'sit', 'lie'],
        tableInputs = document.querySelectorAll('.table-input');
    let  userArr = [],
        radioParents = [];
    answersBtn.addEventListener('click', () => {
        radios.forEach(item => {
            if (item.checked) {
                userArr.push(item.value);
                radioParents.push(item.parentNode);
            }
        });
        userArr.forEach((item, index) => {
            if (item === answersArr[index]) {
                radioParents[index].classList.add('right');
            } else {
                radioParents[index].classList.add('wrong');
            }
        });
        answersBtn.disabled = true;
        setTimeout(() => {
            answersBtn.disabled = false;
            radioParents.forEach(item => {
                item.classList.remove('wrong');
                item.classList.remove('right');
            });
            userArr = [];
            radioParents = [];
        }, 3000);
    });
    /*answers ex 6:
1. steht
2. steht
3. hangen
4.liegen
5. liegen
6. dem , dem
7. dem
8.dem
9. dem
10.dem, der
11. dem
*/
    const showHints = elem => {
        if (elem) {
            elem.classList.toggle('d-none');
        }
    };

    const saveProgress = elem => {
        const ex = document.querySelector(`.${elem}`),
            inputs = ex.querySelectorAll('input');
        const arr = [];

        inputs.forEach(item => {
            arr.push(item.value);
        });
        localStorage.setItem(elem, JSON.stringify(arr));
        console.log(arr);
    };

    const showProgress = elem => {
        const lcWords = JSON.parse(`${localStorage.getItem(elem)}`);
        const ex = document.querySelector(`.${elem}`),
            inputs = ex.querySelectorAll('input');
        if (lcWords) {
            inputs.forEach((item, index) => {
                if (index < lcWords.length) {
                    item.value = lcWords[index];
                }
            });
        }
    };
    showProgress('ex-articles');
    showProgress('definite');
    showProgress('indefinite');

    document.addEventListener('blur', event => {
        const target = event.target;
        if (target.value === target.dataset.answer) {
            target.classList.remove('wrong');
            target.classList.add('right');
        } else {
            target.classList.remove('right');
            target.classList.add('wrong');
        }
        setTimeout(() => {
            tableInputs.forEach(item => {
                item.classList.remove('right');
                item.classList.remove('wrong');
            });
        }, 5000);
        saveProgress('ex-articles');
        saveProgress('definite');
        saveProgress('indefinite');
    }, true);

    document.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.has-hint')) {
            showHints(target.querySelector('.hint'));
        }
    });
};
lesson3();
