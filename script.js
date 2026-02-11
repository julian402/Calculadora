const input = document.getElementById('input');

function add(value) {
    input.value += value;
}

function clearAll() {
    input.value = '';
}

function deleteUnit() {
    input.value = input.value.slice(0, -1);
}

function calculate() {
    try {
        input.value = eval(input.value);
    } catch {
        input.value = 'Error';
        setTimeout(() => {
            input.value = '';
        }, 1000);
    }
}

function getCurrentValue() {
    const v = input.value.trim();
    if (!v) return NaN;
    try {
        return Number(eval(v));
    } catch {
        return NaN;
    }
}

function showError() {
    input.value = 'Error';
    setTimeout(() => { input.value = ''; }, 1000);
}

function squareRoot() {
    const val = getCurrentValue();
    if (Number.isNaN(val) || val < 0) {
        showError();
        return;
    }
    input.value = Math.sqrt(val);
}

function square() {
    const val = getCurrentValue();
    if (Number.isNaN(val)) {
        showError();
        return;
    }
    input.value = val * val;
}

function flashButton(key) {
    const normalized = key === '*' ? '*' : key;
    const btn = document.querySelector(`.keys button[data-key="${normalized}"]`);
    if (btn) {
        btn.classList.add('key-press');
        setTimeout(() => btn.classList.remove('key-press'), 120);
    }
}

document.addEventListener('keydown', function (e) {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        add(key);
        flashButton(key);
        e.preventDefault();
        return;
    }
    if (key === '.' || key === '+' || key === '-' || key === '/') {
        add(key);
        flashButton(key);
        e.preventDefault();
        return;
    }
    if (key === '*') {
        add('*');
        flashButton('*');
        e.preventDefault();
        return;
    }
    if (key === 'Enter') {
        e.preventDefault();
        calculate();
        flashButton('Enter');
        return;
    }
    if (key === 'Backspace') {
        e.preventDefault();
        deleteUnit();
        flashButton('Backspace');
        return;
    }
    if (key === 'Escape') {
        e.preventDefault();
        clearAll();
        flashButton('Escape');
        return;
    }
    if (key === 's' || key === 'S') {
        e.preventDefault();
        squareRoot();
        flashButton('s');
        return;
    }
    if (key === 'q' || key === 'Q') {
        e.preventDefault();
        square();
        flashButton('q');
        return;
    }
});