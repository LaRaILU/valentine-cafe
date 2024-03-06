var CARDAPIO = []

const muda_cardapio = (btn) => {
    var n = btn.getAttribute('data-cardapio-id');

    var cardapios = document.querySelectorAll('.cardapio');

    cardapios.forEach(cardapio => {
        cardapio.classList.add('hidden');
    });

    cardapios[n].classList.remove('hidden');
    
    document.querySelector('#cardapio-titulo').textContent = CARDAPIO[n].nome;
}

const adicionarSacola = (item) => {
    alert(item.nome+" adicionado na sacola! (fixme)");
}

const hydrate = async () => {
    CARDAPIO = await (await fetch('/cardapio.json')).json()
    
    cardapioSwitcher = document.createElement('div');
    cardapioSwitcher.classList.add('btn-group');
    cardapioSwitcher.setAttribute('role', 'btn-group');
    cardapioSwitcher.setAttribute('aria-label', 'Basic radio toggle button group');
    document.body.appendChild(cardapioSwitcher);

    contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    document.body.appendChild(contentDiv);

    var i = -1;
    CARDAPIO.forEach(categoria => {
        i += 1;

        console.log("Categoria: ", categoria.nome);

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

            cardButton = document.createElement('a');
            cardButton.classList.add('btn');
            cardButton.classList.add('btn-danger');
            cardButton.href = "#";
            cardButton.onclick = () => {adicionarSacola(item)};
            cardButton.textContent = "+ Adicionar na Sacola";
            cardBody.appendChild(cardButton);

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
}
window.addEventListener('load', hydrate)