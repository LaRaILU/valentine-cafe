function muda_cardapio(n) {
    var cardapios = document.querySelectorAll('.cardapio');

    cardapios.forEach(cardapio => {
        cardapio.classList.add('hidden');
    });

    cardapios[n].classList.remove('hidden');
}

const adicionarSacola = (item) => {
    alert(item.nome+" adicionado na sacola! (fixme)");
}

const hydrate = async () => {
    const CARDAPIO = await (await fetch('/cardapio.json')).json()
    const contentDiv = document.querySelector('.content');

    CARDAPIO.forEach(categoria => {
        console.log("Categoria: ", categoria.nome);

        cardapioDiv = document.createElement('div');
        cardapioDiv.classList.add('cardapio');
        
        categoriaH2 = document.createElement('h2');
        categoriaH2.textContent = categoria.nome;
        cardapioDiv.appendChild(categoriaH2);

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
    })
}