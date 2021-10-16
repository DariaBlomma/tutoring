'use strict';
const lesson2 = () => {
    const workEatingTable = () => {
        const btnAdd = document.querySelector('.add-row'),
            btnSave = document.querySelector('.save'),
            table = document.querySelector('.eating-table');
        let lcEatingTable = JSON.parse(`${localStorage.getItem('eatingTable')}`);

        const renderRow = (gerne = '', nihctGerne = '', nicht = '') => {
            const row = document.createElement('tr');
            row.classList.add('for-save');
            row.innerHTML = `
                <td class='gerne'><input class='eating-input' value='${gerne}' type="text"></td>
                <td class='nicht-gerne'><input class='eating-input' value='${nihctGerne}'  type="text"></td>
                <td class='nicht'><input class='eating-input' value='${nicht}' type="text"></td>`;
            table.append(row);
        };

        document.addEventListener('DOMContentLoaded', () => {
            if (!lcEatingTable) {
                return;
            }
            lcEatingTable.forEach(item => {
                renderRow(item[0], item[1], item[2]);
            });
        });

        btnAdd.addEventListener('click', () => {
            renderRow();
        });

        // добавить новые слова к себе
        btnSave.addEventListener('click', () => {
            const rowArr = [],
                rows = table.querySelectorAll('.for-save');

            rows.forEach(item => {
                const eatingInputs = item.querySelectorAll('.eating-input');
                const rowArrInner = [];
                eatingInputs.forEach(input => {
                    rowArrInner.push(input.value.trim().toLowerCase());
                });
                rowArr.push(rowArrInner);
            });

            if (!lcEatingTable) {
                lcEatingTable = [];
            }
            lcEatingTable = rowArr;
            localStorage.setItem('eatingTable', JSON.stringify(lcEatingTable));
        });
    };
    workEatingTable();

    const workPresent = () => {
        const renderRows = (tBody, pronounSing, tdSingAnswer, pronounPl,  tdPlAnswer,
            inputClass = '', tdSing = '', tdPl = '') => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <th>${pronounSing}</th>
                <td><input class=${inputClass} type="text" data-answer=${tdSingAnswer}>${tdSing}</td>
            <th>${pronounPl}</th>
                <td><input class=${inputClass} type="text" data-answer=${tdPlAnswer}>${tdPl}</td>`;
            tBody.append(row);
        };
        const mogenArr = [
            {
                pronounSing: 'Ich',
                tdSing: 'mag',
                tdSingAnswer: 'mag',
                pronounPl: 'WIr',
                tdPl: 'mög<b>en</b>',
                tdPlAnswer: 'mögen'
            },
            {
                pronounSing: 'Du',
                tdSing: 'mag<b>st</b>',
                tdSingAnswer: 'mag',
                pronounPl: 'ihr',
                tdPl: 'mög<b>t</b>',
                tdPlAnswer: 'mögt'
            },
            {
                pronounSing: 'Er/sie/es',
                tdSing: 'mag',
                tdSingAnswer: 'mag',
                pronounPl: 'Sie/sie',
                tdPl: 'mög<b>en</b>',
                tdPlAnswer: 'mögen'
            },
        ];

        const machenArr = [
            {
                pronounSing: 'Ich',
                tdSing: 'mach<b>e',
                tdSingAnswer: 'mache',
                pronounPl: 'WIr',
                tdPl: 'mach<b>en</b>',
                tdPlAnswer: 'machen'
            },
            {
                pronounSing: 'Du',
                tdSing: 'mach<b>st</b>',
                tdSingAnswer: 'machst',
                pronounPl: 'ihr',
                tdPl: 'mach<b>t</b>',
                tdPlAnswer: 'macht'
            },
            {
                pronounSing: 'Er/sie/es',
                tdSing: 'mach<b>t</b>',
                tdSingAnswer: 'macht',
                pronounPl: 'Sie/sie',
                tdPl: 'mach<b>en</b>',
                tdPlAnswer: 'machen'
            },
        ];

        const essenArr = [
            {
                pronounSing: 'Ich',
                tdSing: 'ess<b>e',
                tdSingAnswer: 'esse',
                pronounPl: 'Wir',
                tdPl: 'ess<b>en</b>',
                tdPlAnswer: 'essen'
            },
            {
                pronounSing: 'Du',
                tdSing: '<span class="important">i</span>s<b>st</b>',
                tdSingAnswer: 'isst',
                pronounPl: 'ihr',
                tdPl: 'ess<b>t</b>',
                tdPlAnswer: 'esst'
            },
            {
                pronounSing: 'Er/sie/es',
                tdSing: '<span class="important">i</span>ss<b>t</b>',
                tdSingAnswer: 'isst',
                pronounPl: 'Sie/sie',
                tdPl: 'ess<b>en</b>',
                tdPlAnswer: 'essen'
            },
        ];

        document.addEventListener('DOMContentLoaded', () => {
            const mogenBody = document.querySelector('.mogen.no-inputs');
            const machenBody = document.querySelector('.machen.no-inputs');
            const essenBody = document.querySelector('.essen.no-inputs');
            mogenArr.forEach(item => {
                renderRows(mogenBody, item.pronounSing, '', item.pronounPl, '', 'd-none', item.tdSing, item.tdPl);
            });
            machenArr.forEach(item => {
                renderRows(machenBody, item.pronounSing, '', item.pronounPl, '', 'd-none', item.tdSing, item.tdPl);
            });
            essenArr.forEach(item => {
                renderRows(essenBody, item.pronounSing, '', item.pronounPl, '', 'd-none', item.tdSing, item.tdPl);
            });
        });
        document.addEventListener('click', evemt => {
            const target = evemt.target;
            // показать или скрыть таблицу
            if (target.matches('.btn-hide')) {
                const table = target.closest('table');
                const tbody = table.querySelector('.no-inputs');
                tbody.classList.toggle('d-none');
            }

            if (target.matches('.btn-try')) {
                const table = target.closest('table');
                const tBody = table.querySelector('tbody');
                const newBody = tBody.cloneNode();
                table.prepend(newBody);
                const wordClass = tBody.classList[0]; //mogen
                newBody.className = wordClass + '.has-inputs';
                tBody.classList.add('d-none');
                switch (wordClass) {
                case 'mogen' :
                    mogenArr.forEach(item => {
                        renderRows(newBody, item.pronounSing, item.tdSingAnswer,
                            item.pronounPl, item.tdPlAswer, '', '', '');
                    });
                    break;
                case 'machen' :
                    machenArr.forEach(item => {
                        renderRows(newBody, item.pronounSing, item.tdSingAnswer,
                            item.pronounPl, item.tdPlAswer, '', '', '');
                    });
                    break;
                case 'essen' :
                    essenArr.forEach(item => {
                        renderRows(newBody, item.pronounSing, item.tdSingAnswer,
                            item.pronounPl, item.tdPlAswer, '', '', '');
                    });
                    break;
                }

                target.disabled = true;
            }
        });

        const highlightAnswers = () => {
            const tableInputs = document.querySelectorAll('.present-tense input');
            document.addEventListener('blur', event => {
                const target = event.target;
                if (target.matches('.btn')) {
                    return;
                }

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
            }, true);
        };
        highlightAnswers();
    };
    workPresent();

    // drag and drop
    // todo: - после сброса элемента в нужную область создать на его предыдущем месте новый элемент. Чтобы можно было вернуть на место слово и пересобрать предложение
    // todo: кнопка проверить должна быть неактивна, пока предложение не собрано полностью
    // todo: кнопка проверить должна проверять только свою строку
    // todo: сохранять в lc
    // todo: в одну пустую клетку можно вставить сейчас несколько элементов

    // не работает
    const ruSentences = [
        'На завтрак у нас есть хлеб с вареньем или мюсли',
        'Я ем охотнее всего мюсли, моему брату больше нравится хлеб с вареньем.',
        'Я пью одну чашку чая или две.',
    ];
    // данные карточек для совмещения
    // ü ö ä ß Ü Ö Ä
    const cardWords = [
        "Zum Früstuck",
        "gibt's bei uns",
        "Brot",
        "mit",
        "Marmelade",
        "und",
        "Müslii.",
        "Ich",
        "esse",
        "am liebsten",
        "Müsli,",
        "mein Bruder",
        "mag",
        "lieber",
        "ein Marmeladenbrot.",
        "Ich",
        "trinke",
        "eine Tasse",
        "Tee",
        "oder",
        "zwei.",
    ];

    const copyCardWords = cardWords;
    const deSentences = [];

    const dotRegex = /\./;

    const createDeSentences = () => {
        let sentence = '';
        cardWords.forEach((item, index) => {
            console.log('cardWords start: ', cardWords);
            sentence += ` ${item}`;
            console.log('sentence: ', sentence);
            // если есть точка
            if (dotRegex.test(item)) {
                deSentences.push(sentence);
                console.log('deSentences: ', deSentences);
                sentence = [];
                // console.log('index: ', index);
                cardWords.splice(0, index + 1);
                console.log('cardWords splice: ', cardWords);
                return cardWords;
                //
            }
            // cardWords.shift();
            console.log('cardWords end: ', cardWords);
        });
    };
// console.log(cardWords.splice(0, 7));
    createDeSentences();
    const adjustedForClassName = text => text.toLowerCase().replace(/\s/g, '-');

    const renderRuSentences = item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.className = 'ru-text__item';
        document.querySelector('.ru-text').append(div);
    };

    const renderBoxItems = item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.setAttribute('draggable', true);
        div.className = "box__item";
        div.classList.add(adjustedForClassName(item));
        document.querySelector('.box').append(div);
    };

    const renderResultItems = (elem, text) => {
        const div = document.createElement("div");
        div.className = "result__item";
        div.addEventListener('drop', drop_handler);
        div.addEventListener('dragover', dragover_handler);
        div.addEventListener('dragleave', dragleave_handler);
        div.dataset.answer = text;
        div.textContent = text;
        elem.append(div);
    };

    
    // const renderResultLists = index => {
    //     // debugger;
    //     const div = document.createElement("div");
    //     div.className = `result__line line-${index}`;
    //     copyCardWords.forEach(item => {
    //         renderResultItems(div, adjustedForClassName(item));            
    //         // если есть точка
    //         if (dotRegex.test(item)) {
    //             // copyCardWords.pop(item);
    //             div.innerHTML += `<button class='check'>Check</button>`;
    //             return document.querySelector('.result').append(div);
    //         }
    //         copyCardWords.shift(item);
    //     });
    // };

    const renderResultLists = index => {
        // debugger;
        const div = document.createElement("div");
        div.className = `result__line line-${index}`;
        div.innerHTML = `<button class='check'>Check</button>`;
        document.querySelector('.result').append(div);
    };

    cardWords.forEach(item => {
        renderBoxItems(item);
    });

    ruSentences.forEach((item, index) => {
        renderResultLists(index);
        renderRuSentences(item);
    });
    // const renderBackupDropZone = () => {
    //     const div = document.createComment('div');
    //     div.className = 'result__item';
    //     document.querySelector('.box').append(div);
    //     div.addEventListener('drop', drop_handler);
    //     div.addEventListener('dragover', dragover_handler);
    //     div.addEventListener('dragleave', dragleave_handler);
    // };


    function dragstart_handler(ev) {
        const cl = ev.target.classList[ev.target.classList.length - 1];
        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", ev.target.textContent);
        ev.dataTransfer.setData("text/plain", cl);
        ev.dataTransfer.dropEffect = "move";
    }

    function dragover_handler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        ev.target.classList.add('is-dragged-over');
    }

    function dragleave_handler(ev) {
        ev.preventDefault();
        ev.target.classList.remove('is-dragged-over');
    }

    function drop_handler(ev) {
        ev.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        const data = ev.dataTransfer.getData("text/plain");
        const droppedElem = document.querySelector(`.${data}`);
        ev.target.appendChild(droppedElem);
        droppedElem.classList.add('is-dropped');
        ev.target.classList.remove('is-dragged-over');
        renderBackupDropZone();
    }

    const box__items = document.querySelectorAll('.box__item');

    window.addEventListener('DOMContentLoaded', () => {
        box__items.forEach(item => {
            // Add the ondragstart event listener
            item.addEventListener("dragstart", dragstart_handler);
        })
    });

    const btn = document.querySelector('.check');
    btn.addEventListener('click', () => {
        const line1_items = document.querySelectorAll('.line1');
        line1_items.forEach(item => {
            if (item.childNodes[0].textContent.toLowerCase() === item.dataset.answer) {
                item.childNodes[0].classList.add('right');
            } else {
                item.childNodes[0].classList.add('wrong');
            }
        })
    })
    };
lesson2();

