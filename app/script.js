document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Реактивность: Переключение состояния "Корзина" ---

    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем текущее состояние из data-атрибута
            const isInCart = this.getAttribute('data-in-cart') === 'true';

            if (isInCart) {
                // Если товар уже в корзине (УДАЛЯЕМ)
                this.setAttribute('data-in-cart', 'false');
                this.textContent = 'В корзину';
            } else {
                // Если товара нет в корзине (ДОБАВЛЯЕМ)
                this.setAttribute('data-in-cart', 'true');
                this.textContent = 'В корзине';
            }
        });
    });

    // --- 2. Реактивность: Добавление в "Избранное" ---

    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        // Ищем вложенный тег <i>
        const icon = button.querySelector('.favorite-icon-inner');

        button.addEventListener('click', function() {
            // Переключаем класс is-favorite
            const isFavorite = this.classList.toggle('is-favorite');

            // Меняем название иконки
            icon.textContent = isFavorite ? 'favorite' : 'favorite_border';
        });
    });


    // --- 3. Реактивность: Поиск карточек на странице ---

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