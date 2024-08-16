if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar)
} else {
    iniciar();
}

function iniciar() {
  const removerProdutoBotao = document.getElementsByClassName("remover-produto-botao");
  for (var i = 0; i < removerProdutoBotao.length; i++) {
    removerProdutoBotao[i].addEventListener("click", removerProduto);
  }

  const quantidadeInputs = document.getElementsByClassName('produto-qtd-input');
  for (var i = 0; i < quantidadeInputs.length; i++) {
    quantidadeInputs[i].addEventListener('change', updateTotal);
  }

  const adicionarCarrinho = document.getElementsByClassName('button-hover-background');
  for (var i = 0; i < adicionarCarrinho.length; i++) {
    adicionarCarrinho[i].addEventListener('click', adicionarParaCarrinho);
  }
}

function checkIfInputIsNull(event) {
    if(event.target.value === "0") {
        event.target.parentElement.parentElement.remove();
    }

    updateTotal();
}


function adicionarParaCarrinho(event) {
    const button = event.target
    const produtoInfo = button.parentElement.parentElement;
    const produtoImagem = produtoInfo.getElementsByClassName('produto-imagem')[0].src;
    const produtoTitulo = produtoInfo.getElementsByClassName('produto-titulo')[0].innerText;
    const produtoPreco = produtoInfo.getElementsByClassName('produto-preco')[0].innerText;
    
    const produtosCarrinhoNome = document.getElementsByClassName('card-produto-preco');
    for (var i = 0; i < produtosCarrinhoNome.length; i++) {
        if(produtosCarrinhoNome[i].innerText === produtoTitulo) {
            produtosCarrinhoNome[i].parentElement.parentElement.getElementsByClassName('produto-qtd-input')[0].value++;
            return
        }
    }

    let novoCard = document.createElement('div');
    novoCard.classList.add('card-produto');

    novoCard.innerHTML = 
            `
                <img src="${produtoImagem}" alt="${produtoTitulo}" class="card-produto-imagem">
                <strong class="card-produto-titulo">${produtoTitulo}</strong>
                <span class="card-produto-preco">${produtoPreco}</span>
              `

    const carrinho = document.querySelector('.carrinho');
    carrinho.append(novoCard);

    updateTotal();
    novoCard.getElementsByClassName('produto-qtd-input')[0].addEventListener('change', checkIfInputIsNull);
    novoCard.getElementsByClassName('remover-botao')[0].addEventListener('click', removerProduto);
}

function removerProduto(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
}


function updateTotal() {
  let totalAnnout = 0;

  const cardProdutos = document.getElementsByClassName("card-produto");
  for (var i = 0; i < cardProdutos.length; i++) {
    const produtoPreco = cardProdutos[i].getElementsByClassName("card-produto-preco")[0].innerText.replace("R$", "").replace(",", ".");
    const produtoQtd =cardProdutos[i].getElementsByClassName("produto-qtd-input")[0].value;

    totalAnnout = totalAnnout + produtoPreco * produtoQtd;
  }

  totalAnnout = totalAnnout.toFixed(2);
  totalAnnout = totalAnnout.replace(".", ",");
  const spanPrice = (document.querySelector(".card-total-container span").innerText = "R$" + totalAnnout);
}