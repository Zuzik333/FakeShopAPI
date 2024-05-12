document.addEventListener('DOMContentLoaded', function () {
    const priceInput = document.getElementById('price');
    const priceValue = document.getElementById('priceValue');
    const categoryButtons = document.getElementById('categoryButtons');
    const productList = document.getElementById('productList');
    const cartButton = document.getElementById('cartButton');
    const cartContent = document.getElementById('cartContent');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const themeButton = document.getElementById('themeButton');
    const body = document.body;

    let products = [];
    let cart = [];
    let darkMode = false;

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            renderCategories();
            renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function renderCategories() {
        const categories = ['Wszystkie', ...new Set(products.map(product => product.category))];
        categoryButtons.innerHTML = '';
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.addEventListener('click', () => {
                filterByCategory(category);
            });
            categoryButtons.appendChild(button);
        });
    }

    function filterByCategory(category) {
        const filteredProducts = category === 'Wszystkie' ? products : products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender = products) {
        productList.innerHTML = '';
        productsToRender.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <p><strong>Nazwa:</strong> ${product.title}</p>
                <p><strong>Cena:</strong> $${product.price}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Dodaj do koszyka</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    function addToCart(productId) {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            console.log('Produkt dodany do koszyka:', productToAdd);
            renderCart();
        }
    }

    function renderCart() {
        cartContent.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <span>${product.title}</span>
                <span>$${product.price.toFixed(2)}</span>
            `;
            cartContent.appendChild(cartItem);
            totalPrice += product.price;
        });
        renderTotalPrice(totalPrice);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderTotalPrice(totalPrice) {
        cartContent.innerHTML += `<div>Łączna cena: $${totalPrice.toFixed(2)}</div>`;
    }

    priceInput.addEventListener('input', () => {
        const price = parseInt(priceInput.value);
        priceValue.textContent = `$0 - $${price}`;
        filterByPrice(price);
    });

    function filterByPrice(price) {
        const filteredProducts = products.filter(product => product.price <= price);
        renderProducts(filteredProducts);
    }

    cartButton.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    productList.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-product-id'));
            addToCart(productId);
        }
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            renderProducts();
        } else {
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
            renderProducts(filteredProducts);
        }
    });

    themeButton.addEventListener('click', () => {
        darkMode = !darkMode;
        if (darkMode) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    });

    fetchProducts();
    
});


