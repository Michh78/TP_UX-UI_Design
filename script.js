let currentPage = 0;
const productsPerPage = 15;

function loadProducts(page = 0) {
    fetch(`http://localhost:8000/products.php?limit=${productsPerPage}&offset=${page * productsPerPage}`)
        .then(response => response.json())
        .then(products => {
            console.log(products);
            const productGrid = document.querySelector('.product-grid');
            productGrid.innerHTML = '';

            if (products.length === 0) {
                productGrid.innerHTML = '<p>Aucun produit à afficher.</p>';
                return;
            }

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>${product.price}€</p>
                `;
                productGrid.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des produits:', error);
        });
}

function changePage(direction) {
    currentPage += direction;
    loadProducts(currentPage);

    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = false;

    fetch(`http://localhost:8000/products.php?limit=${productsPerPage}&offset=${(currentPage + 1) * productsPerPage}`)
        .then(response => response.json())
        .then(products => {
            if (products.length === 0) {
                document.getElementById('nextBtn').disabled = true;
            }
        });
}

loadProducts(currentPage);
