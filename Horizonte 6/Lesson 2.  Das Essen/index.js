'use strict';
const lesson1 = () => {
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
};
lesson1();