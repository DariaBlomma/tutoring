// use strict
const markAnswered = (item) => {
    if (item.value !== '') {
        if (item.value === item.dataset.answer) {
            item.classList.remove('wrong');
            item.classList.add('right');
        } else {
            item.classList.remove('right');
            item.classList.add('wrong');
        }
    }
};

// for number 10, id 8893
const inputs = document.querySelectorAll('.input.ex-10');
inputs.forEach((item, index) => {
    item.value = JSON.parse(localStorage.getItem('n10_9983'))[index] || '';
    markAnswered(item);
});


document.addEventListener('blur', event => {
    const target = event.target;

    markAnswered(target);

    const n10_9983 = [];
    inputs.forEach(item => {
        n10_9983.push(item.value);
    });
    localStorage.setItem('n10_9983', JSON.stringify(n10_9983));
}, true)
