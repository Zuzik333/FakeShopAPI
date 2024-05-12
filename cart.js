document.addEventListener('DOMContentLoaded', function () {
    const cartContent = document.getElementById('cartContent');
    const totalPriceElement = document.getElementById('totalPrice');


    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartContent.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item'); 
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <span>${product.title}</span>
                <span>$${product.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-product-id="${product.id}">Usuń produkt</button>
            `;
            cartContent.appendChild(cartItem);
            totalPrice += product.price;
        });
        renderTotalPrice(totalPrice);
    }

    function renderTotalPrice(totalPrice) {
        totalPriceElement.textContent = `Łączna cena: $${totalPrice.toFixed(2)}`;
    }

   
    renderCart();

 
    cartContent.addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.getAttribute('data-product-id'));
            removeFromCart(productId);
        }
    });

    function removeFromCart(productId) {
        cart = cart.filter(product => product.id !== productId);
        renderCart();

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    

    cart.forEach(product => {
        addToCart(product.id);
    });
});
