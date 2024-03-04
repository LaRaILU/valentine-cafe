
const CARDAPIO = [
    [ // Pratos
        14.90, // Prato do Dia
        19.90, // Macarronofe
        22.90  // Lasanha
    ],
    [ // Bebidas
        5.99, // Refri
        6.99, // Suco de Laranja
        3.50  // Água
    ],
    [ // Sobremesas
        9.99, // Sorvete
        6.99, // Pudim
        9.99  // Torta de Limão
    ]
]

function modalErrorClose() {
    document.querySelector('#error').style.display = 'none';
    document.querySelector('#error').animate("spinShow")
}

function modalError(x, elmn) {
    document.querySelector('#error').style.display = '';
    document.querySelector('#error-content').innerHTML = x;
}

function comecar() {
    var input = document.querySelector("#nome-input");
    var nome = input.value
    document.querySelector("#nome-print").textContent = nome;

    var div = document.querySelector('.selects-div');
    var nameInputDiv = document.querySelector('.nomeinput-div');


    if(nome && nome.trim() !== '') {
        div.classList.remove('hidden');
        nameInputDiv.classList.add("hidden");
    } else {
        modalError("Você precisa informar o seu nome!");
    }
}

function limparSelecao() {
    document.querySelectorAll('.form-select').forEach(select => {
        select.selectedIndex = 0;
    });
    calcularTotal()
}

function calcularTotal() {
    var total = 0.00;
    var selects = document.querySelectorAll('.form-select')
    for (let i = 0; i < selects.length; i++) {
        var select = selects[i]
        var selecionado = select.selectedIndex;
        
        if (selecionado != 0) {
            total += CARDAPIO[i][selecionado-1];
        }
    }

    document.querySelector("#price-display").textContent = `R$ ${total.toFixed(2)}`
    return total
}

function fazerPedido() {
    
    swal("Pedido Realizado!", `Preço: R$ ${calcularTotal().toFixed(2)}`, "success");
}