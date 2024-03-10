var CARDAPIO = []

// BootStrap Toasts

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl, option)
})

//


const muda_cardapio = (btn) => {
    var n = btn.getAttribute('data-cardapio-id');

    var cardapios = document.querySelectorAll('.cardapio');

    cardapios.forEach(cardapio => {
        cardapio.classList.add('hidden');
    });

    cardapios[n].classList.remove('hidden');
    
    document.querySelector('#cardapio-titulo').textContent = CARDAPIO[n].nome;
}

const adicionarSacola = async (item) => {
    var sacolaPrev = localStorage.getItem('sacola');
    if (sacolaPrev === null) {
        sacolaPrev = "[]";
    }
    var sacola = await JSON.parse(sacolaPrev);
    sacola.push(item);
    localStorage.setItem('sacola', JSON.stringify(sacola));
    
    calcularTotal()
    
    Toastify({
        text: item.nome+" adicionado na sacola!", 
        gravity: 'bottom', 
        style: {background: "#cc2f2f"}
    }).showToast()
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

const hydrate = async () => {
    if(localStorage.getItem('nome') !== null) {
        document.querySelector('#nome-print').textContent = localStorage.getItem('nome');
    }

    CARDAPIO = await (await fetch('/cardapio.json')).json()
    
    cardapioSwitcher = document.createElement('div');
    cardapioSwitcher.classList.add('btn-group');
    cardapioSwitcher.setAttribute('role', 'btn-group');
    cardapioSwitcher.setAttribute('aria-label', 'Basic radio toggle button group');
    document.body.appendChild(cardapioSwitcher);

    btnTodoCardapio = document.createElement('input');
    btnTodoCardapio.classList.add('btn-check');
    btnTodoCardapio.setAttribute('type', 'radio');
    btnTodoCardapio.setAttribute('name', 'cardapio');
    btnTodoCardapio.setAttribute('autocomplete', 'off');
    btnTodoCardapio.setAttribute('checked', 'checked');
    btnTodoCardapio.id = "btncardapio-tudo";
    btnTodoCardapio.onclick = () => {
        document.querySelector('#cardapio-titulo').textContent = 'Cardápio';
        document.querySelectorAll('.cardapio').forEach(cardapio => {
            cardapio.classList.remove('hidden');
        });
    }
    cardapioSwitcher.appendChild(btnTodoCardapio);
    btnTodoCardapioLabel = document.createElement('label');
    btnTodoCardapioLabel.classList.add('btn');
    btnTodoCardapioLabel.classList.add('btn-outline-danger');
    btnTodoCardapioLabel.classList.add('material-symbols-outlined');
    btnTodoCardapioLabel.textContent = "apps";
    btnTodoCardapioLabel.setAttribute('for', 'btncardapio-tudo');
    cardapioSwitcher.appendChild(btnTodoCardapioLabel);

    contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    document.body.appendChild(contentDiv);

    

    var i = -1;
    CARDAPIO.forEach(categoria => {
        i += 1;

        console.log("Categoria: ", categoria.nome, categoria.itens);

        cardapioDiv = document.createElement('div');
        cardapioDiv.classList.add('cardapio');
        
        // categoriaH2 = document.createElement('h2');
        // categoriaH2.textContent = categoria.nome;
        // cardapioDiv.appendChild(categoriaH2);

        wrapCardsDiv = document.createElement('div')
        wrapCardsDiv.classList.add('wrap-cards')
        categoria.itens.forEach(item => {
            cardDiv = document.createElement('div')
            cardDiv.classList.add('card');
            cardDiv.style.width = "18rem"; // ??? FIXME

            cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = item.img_card;
            cardDiv.appendChild(cardImg);

            cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = item.nome;
            cardBody.appendChild(cardTitle);

            cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = item.desc;
            cardBody.appendChild(cardText);

            cardButtonGroup = document.createElement('div');
            cardButtonGroup.classList.add('btn-group');
            cardButtonGroup.classList.add('btn-group-card');
            cardButtonGroup.setAttribute('role', 'group');
            cardButton = document.createElement('a');
            cardButton.classList.add('btn');
            cardButton.classList.add('btn-danger');
            cardButton.onclick = () => {adicionarSacola(item)};
            cardButtonIcon = document.createElement('span');
            cardButtonIcon.classList.add('material-symbols-outlined');
            cardButtonIcon.textContent = "add"
            cardButton.appendChild(cardButtonIcon);
            cardButton.innerHTML += "Adicionar na Sacola";
            cardPriceBadge = document.createElement('div');
            cardPriceBadge.classList.add('item-price');
            cardPriceBadge.classList.add('badge');
            cardPriceBadge.classList.add('text-bg-light');
            cardPriceBadge.textContent = `R$ ${item.preco.toFixed(2)}`;
            cardButtonGroup.appendChild(cardButton);
            cardButtonGroup.appendChild(cardPriceBadge);
            cardBody.appendChild(cardButtonGroup);

            cardDiv.appendChild(cardBody);

            wrapCardsDiv.appendChild(cardDiv);
        })
        cardapioDiv.appendChild(wrapCardsDiv);

        contentDiv.appendChild(cardapioDiv);

        btnMudaCardapio = document.createElement('input');
        btnMudaCardapio.classList.add('btn-check');
        btnMudaCardapio.setAttribute('type', 'radio');
        btnMudaCardapio.setAttribute('name', 'cardapio');
        btnMudaCardapio.setAttribute('autocomplete', 'off');
        btnMudaCardapio.id = "btncardapio_"+categoria.nome;
        btnMudaCardapio.setAttribute('data-cardapio-id', i);
        btnMudaCardapio.setAttribute('onclick', 'muda_cardapio(this)');
        cardapioSwitcher.appendChild(btnMudaCardapio);
        btnMudaCardapioLabel = document.createElement('label');
        btnMudaCardapioLabel.classList.add('btn');
        btnMudaCardapioLabel.classList.add('btn-outline-danger');
        btnMudaCardapioLabel.textContent = categoria.nome;
        btnMudaCardapioLabel.setAttribute('for', 'btncardapio_'+categoria.nome);
        cardapioSwitcher.appendChild(btnMudaCardapioLabel);


    })

    calcularTotal();
}
window.addEventListener('load', hydrate)