const visor = document.getElementById('visor');

function inserir(valor) {
    visor.value += valor;
}

function limpar() {
    visor.value = '';
}

function apagar() {
    visor.value = visor.value.slice(0, -1);
}

function calcular() {
    try {
        let expressao = visor.value.replace(/x/g, '*').replace(/÷/g, '/');
        
        if (contarParenteses(expressao)) {
            visor.value = 'Erro: Parênteses';
            return;
        }
        
        let resultado = eval(expressao);
        
        if (isNaN(resultado) || !isFinite(resultado)) {
            throw new Error();
        }
        
        visor.value = resultado;
    } catch {
        visor.value = 'Erro';
    }
}

function contarParenteses(expressao) {
    let abertos = 0;
    for (let char of expressao) {
        if (char === '(') abertos++;
        if (char === ')') abertos--;
        if (abertos < 0) return true;
    }
    return abertos !== 0;
}

document.addEventListener('keydown', function(event) {
    const tecla = event.key;
    
    if (/[0-9+\-*/.()]/.test(tecla)) {
        inserir(tecla);
    } else if (tecla === 'Enter') {
        calcular();
    } else if (tecla === 'Backspace') {
        apagar();
    } else if (tecla === 'Escape') {
        limpar();
    } else if (tecla === ',') {
        inserir('.');
    }
});
