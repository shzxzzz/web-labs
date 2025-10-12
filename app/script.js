document.addEventListener('DOMContentLoaded', () => {

    // Корзина
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isInCart = this.getAttribute('data-in-cart') === 'true';

            if (isInCart) {
                this.setAttribute('data-in-cart', 'false');
                this.textContent = 'В корзину';
            } else {
                this.setAttribute('data-in-cart', 'true');
                this.textContent = 'В корзине';
            }
        });
    });
    // избранное

    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        const icon = button.querySelector('.favorite-icon-inner');

        button.addEventListener('click', function() {
            const isFavorite = this.classList.toggle('is-favorite');

            icon.textContent = isFavorite ? 'favorite' : 'favorite_border';
        });
    });


    // Поиск

    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();

            if (productName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

});