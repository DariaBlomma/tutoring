'use strict';
const showMatchAnswer = () => {
    const input = document.querySelector('.ex2-input'),
        resultInfo = document.querySelector('.result-info'),
        rightAnswer = 'ahfjgebicd';
    input.addEventListener('blur', () => {
        if (input.value === rightAnswer) {
            resultInfo.textContent = 'You are right!';
            resultInfo.classList.add('is-right');
            input.classList.add('is-right');
        } else {
            resultInfo.innerHTML = `Sorry, you made some mistakes( The right answers is <b>ahfjgebicd</b> `;
            resultInfo.classList.add('is-error');
            input.classList.add('is-error');
        }

        resultInfo.classList.remove('d-none');
        setTimeout(() => {
            resultInfo.classList.add('d-none');
        }, 10000);
    });
};
showMatchAnswer();

const toggleWordsPopups = () => {
    const wordsPopUp = document.querySelector('.lesson-new-words'),
        personalWords = document.querySelector('.personal-words');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.btn-show-new-words') || target.matches('.lesson-words-link')) {
            wordsPopUp.classList.remove('d-none');
        }

        if (target.matches('.personal-words-link')) {
            personalWords.classList.remove('d-none');
        }

        if (target.matches('.lesson-new-words .close') && !wordsPopUp.classList.contains('d-none')) {
            wordsPopUp.classList.add('d-none');
        }

        if (target.matches('.personal-words .close') && !personalWords.classList.contains('d-none')) {
            personalWords.classList.add('d-none');
        }
    });
};
toggleWordsPopups();

const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
        menuPopUp = document.querySelector('.menu-popup');
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.menu')) {
            menuPopUp.classList.remove('d-none');
            menuBtn.classList.add('d-none');
        }

        if (target.matches('.menu-popup .close') && !menuPopUp.classList.contains('d-none')) {
            menuPopUp.classList.add('d-none');
            menuBtn.classList.remove('d-none');
        }
    });
};
toggleMenu();

const check3d = () => {
    document.addEventListener('blur', event => {
        const target = event.target;
        if (!target.closest('.ex3d-inputs')) {
            return;
        }

        if (target.value === target.dataset.answer || target.value === target.dataset.alt) {
            target.classList.add('is-right');
            target.classList.remove('is-error');
        } else {
            target.classList.add('is-error');
            target.classList.remove('is-right');
        }

        setTimeout(() => {
            target.classList.remove('is-error');
            target.classList.remove('is-right');
        }, 2000);
    }, true);
};
check3d();

const showLessonWords = () => {
    const message = document.querySelector('.if-nothing'),
        personalWordsTable = document.querySelector('.personal-words-list'),
        addWordsTable = document.querySelector('.table-add-words'),
        addInputs = addWordsTable.querySelectorAll('.add-input'),
        btnAddPersonal = document.querySelector('.btn-add-words'),
        btnAddAll = document.querySelector('.btn-add-all'),
        lesson1Words = [
            ['family history', 'семейная история'],
            ["sb's side of the family", "с чъей-то стороны, линии"],
            ['ancestors', 'предки'],
            ['great-grandparents', 'прабабушка и прадедушка'],
            ['relatives', 'родственниики'],
            ['related to', 'связанный с'],
            ['inherit', 'наследовать'],
            ['take after', 'походить на кого-либо'],
            ['roots', 'корни'],
            ['extended family', 'расширенная семья']
        ],
        lessonWordsTable = document.querySelector('.lesson-words');

    let lcWords = JSON.parse(`${localStorage.getItem('personalWords')}`);

    const renderRow = (en, ru, table) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${en}</th>
            <td>${ru}</th>
        `;
        table.append(row);
    };

    // показать личные незнакмоые слова в таблице
    if (!lcWords) {
        message.classList.remove('d-none');
        personalWordsTable.classList.add('d-none');
    } else {
        message.classList.add('d-none');
        personalWordsTable.classList.remove('d-none');
        lcWords.forEach(item => {
            renderRow(item[0], item[1], personalWordsTable);
        });
    }

    // добавить новые слова к себе
    btnAddPersonal.addEventListener('click', () => {
        const rowArr = [];
        addInputs.forEach(item => {
            rowArr.push(item.value.trim().toLowerCase());
            item.value = '';
        });
        lcWords.push(rowArr);
        localStorage.setItem('personalWords', JSON.stringify(lcWords));
        renderRow(rowArr[0], rowArr[1], personalWordsTable);
    });

    // отрендерить список новых слов урока
    document.addEventListener('DOMContentLoaded', () => {
        lesson1Words.forEach(item => {
            renderRow(item[0], item[1], lessonWordsTable);
        });
    });

    // при добавлении всех новых слов урока отрендерить их в личной таблице
    btnAddAll.addEventListener('click', () => {
        lesson1Words.forEach(item => {
            if (!lcWords) {
                lcWords = [];
            }
            lcWords.push(item);
            localStorage.setItem('personalWords', JSON.stringify(lcWords));
            renderRow(item[0], item[1], personalWordsTable);
            message.classList.add('d-none');
            personalWordsTable.classList.remove('d-none');
        });
        btnAddAll.setAttribute('disabled', true);
    });

};
showLessonWords();

const fixHeader = () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (pageYOffset > 0) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
};

fixHeader();

const showHover = () => {
    const ex5 = document.querySelector('.ex5'),
        ex5audio = document.querySelector('.ex5-audio');
    ex5.addEventListener('mouseover', () => {
        ex5audio.classList.add('visible');
    });
};
showHover();
