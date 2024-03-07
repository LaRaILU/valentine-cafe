
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
    var nome = input.value;
    document.querySelector("#nome-print").textContent = nome;

    var div = document.querySelector('.pedido-div');
    var nameInputDiv = document.querySelector('.nomeinput-div');


    if(nome && nome.trim() !== '') {
        div.classList.remove('hidden');
        nameInputDiv.classList.add("hidden");
        localStorage.setItem('nome', nome);
    } else {
        modalError("Você precisa informar o seu nome!");
    }
}

function limparSelecao() {
    if(confirm("Você tem certeza que quer limpar sua sacola?")) {
        localStorage.setItem('sacola', '[]');
        hydrate();
    }
}

function fazerPedido() {
    
    swal("Pedido Realizado!", `Preço: R$ ${calcularTotal().toFixed(2)}`, "success");
}

const calcularTotal = () => {
    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);

    var total = 0;
    sacola.forEach(item => {
        total += item.preco
    })

    document.querySelectorAll('.total-content').forEach(elm => {
        elm.textContent = "R$ "+total.toFixed(2);
    })

    return total;
}

const hydrate = () => {

    var sacolaRaw = localStorage.getItem('sacola');
    if (sacolaRaw === null) {
        sacolaRaw = "[]";
    }
    var sacola = JSON.parse(sacolaRaw);

    var itemListDiv = document.querySelector('.pedido-item-list');
    itemListDiv.innerHTML = "";

    sacola.forEach(item => {
        itemDiv = document.createElement('div'); // itemDiv
        itemDiv.classList.add('item-div');

        itemImg = document.createElement('img'); /// itemImg
        itemImg.classList.add('item-img');
        itemImg.src = item.img_card;
        itemDiv.appendChild(itemImg);           /// \itemImg

        itemInfo = document.createElement('div'); /// itemInfo
        itemInfo.classList.add('item-info');

        itemNome = document.createElement('h5');    //// itemNome
        itemNome.classList.add('item-nome');
        itemNome.textContent = item.nome;
        itemInfo.appendChild(itemNome);              //// \itemNome

        itemPreco = document.createElement('p');    //// itemPreco
        itemPreco.classList.add('item-preco');
        itemPreco.textContent = "R$ "+item.preco.toFixed(2);
        itemInfo.appendChild(itemPreco);            //// \itemPreco
        
        itemDiv.appendChild(itemInfo);          /// \itemInfo
        itemListDiv.appendChild(itemDiv);
    })

    calcularTotal();

}


window.addEventListener('load', ()=>{

    hydrate();
    
    if (localStorage.getItem('nome') === null) {
        var nameInputDiv = document.querySelector('.nomeinput-div');
        nameInputDiv.classList.remove('hidden');
        
        var pedidoDiv = document.querySelector('.pedido-div');
        pedidoDiv.classList.add('hidden');
    } else {

        var nameInputDiv = document.querySelector('.nomeinput-div');
        nameInputDiv.classList.add('hidden');
        
        document.querySelector('#nome-print').textContent = localStorage.getItem('nome');
        
        var pedidoDiv = document.querySelector('.pedido-div');
        pedidoDiv.classList.remove('hidden');
    }
})
