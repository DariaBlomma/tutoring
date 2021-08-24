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
};
lesson2();

