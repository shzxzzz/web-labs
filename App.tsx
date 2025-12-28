import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import SearchResults from './components/SearchResults';
import Cart from './components/Cart';
import Footer from './components/Footer';
import type { Product, Page, DisplayMode } from './types';

const initialProducts: Product[] = [
    { id: 1, name: "Худи оверсайз", price: 2499, originalPrice: 2999, description: "Чёрный оверсайз худи", isFavorite: false, isInCart: false, quantity: 1 },
    { id: 2, name: "Карго штанцы", price: 1999, description: "Зелёные карго штаны", isFavorite: true, isInCart: false, quantity: 1 },
    { id: 3, name: "Шапка бини", price: 999, originalPrice: 1499, description: "Шапка бини", isFavorite: false, isInCart: true, quantity: 2 },
    { id: 4, name: "Пуховик хайповый", price: 2999, description: "Синяя пуховая куртка", isFavorite: false, isInCart: false, quantity: 1 },
    { id: 5, name: "Шапка-ушанка", price: 1299, originalPrice: 1599, description: "Шапка ушанка", isFavorite: true, isInCart: false, quantity: 1 },
    { id: 6, name: "Жоггеры", price: 1799, description: "Серые джоггеры", isFavorite: false, isInCart: true, quantity: 1 },
    { id: 7, name: "Джинсовка", price: 2599, originalPrice: 2999, description: "Джинсовая куртка", isFavorite: false, isInCart: false, quantity: 1 },
    { id: 8, name: "Красовки хайп", price: 2799, description: "Чёрные кроссовки", isFavorite: true, isInCart: false, quantity: 1 },
    { id: 9, name: "Джинсы", price: 2199, originalPrice: 2699, description: "Широкие джинсы", isFavorite: false, isInCart: false, quantity: 1 },
    { id: 10, name: "Куртка-кожанка", price: 3899, description: "Кожаная куртка", isFavorite: false, isInCart: false, quantity: 1 },
];

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts.map(p => ({
        ...p,
        isSelected: p.isInCart
    })));
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [displayMode, setDisplayMode] = useState<DisplayMode>('home');
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                if (displayMode === 'search' || displayMode === 'favorites') {
                    setDisplayMode('home');
                    if (displayMode === 'search') {
                        setSearchQuery('');
                    }
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [displayMode]);

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }, [products, searchQuery]);

    const favoriteProducts = useMemo(() =>
        products.filter(product => product.isFavorite), [products]);

    const cartProducts = useMemo(() =>
        products.filter(product => product.isInCart), [products]);

    const handleToggleFavorite = (id: number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
        ));
    };

    const handleToggleCart = (productToToggle: Product) => {
        setProducts(products.map(product =>
            product.id === productToToggle.id
                ? {
                    ...product,
                    isInCart: !product.isInCart,
                    quantity: !product.isInCart ? 1 : product.quantity,
                    isSelected: !product.isInCart
                }
                : product
        ));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity } : product
        ));
    };

    const handleToggleSelect = (id: number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isSelected: !product.isSelected } : product
        ));
    };

    const handleRemoveItem = (id: number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isInCart: false, isSelected: false } : product
        ));
    };

    const handleSelectAll = () => {
        const allSelected = cartProducts.every(item => item.isSelected);
        setProducts(products.map(product =>
            product.isInCart ? { ...product, isSelected: !allSelected } : product
        ));
    };

    const handleRemoveAll = () => {
        setProducts(products.map(product =>
            product.isSelected ? { ...product, isInCart: false, isSelected: false } : product
        ));
    };

    const handleBuyNow = (id: number) => {
        const product = products.find(p => p.id === id);
        alert(`Товар "${product?.name}" будет куплен!`);
    };

    const renderContent = () => {
        if (currentPage === 'cart') {
            return (
                <Cart
                    cartItems={cartProducts}
                    onUpdateQuantity={handleUpdateQuantity}
                    onToggleSelect={handleToggleSelect}
                    onToggleFavorite={handleToggleFavorite}
                    onRemoveItem={handleRemoveItem}
                    onSelectAll={handleSelectAll}
                    onRemoveAll={handleRemoveAll}
                    onBuyNow={handleBuyNow}
                />
            );
        }

        return (
            <>
                <h1 className="page-title">Магазин одежды "Престиж"</h1>
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onToggleFavorite={handleToggleFavorite}
                            onToggleCart={handleToggleCart}
                        />
                    ))}
                </div>
            </>
        );
    };

    const renderOverlay = () => {
        if (currentPage === 'cart') return null;

        if (displayMode === 'search' && searchQuery.trim() && filteredProducts.length > 0) {
            return (
                <div className="search-overlay" ref={searchRef}>
                    <div className="search-overlay-content">
                        <SearchResults
                            products={filteredProducts}
                            onToggleFavorite={handleToggleFavorite}
                            onToggleCart={handleToggleCart}
                            title={`Результаты поиска: "${searchQuery}"`}
                        />
                    </div>
                </div>
            );
        }

        if (displayMode === 'favorites' && favoriteProducts.length > 0) {
            return (
                <div className="search-overlay" ref={searchRef}>
                    <div className="search-overlay-content">
                        <SearchResults
                            products={favoriteProducts}
                            onToggleFavorite={handleToggleFavorite}
                            onToggleCart={handleToggleCart}
                            title="Любимое"
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setDisplayMode('search');
        } else if (displayMode === 'search') {
            setDisplayMode('home');
        }
    };

    const handleDisplayModeChange = (mode: DisplayMode) => {
        setDisplayMode(mode);
        if (mode === 'favorites') {
            setSearchQuery('');
        }
    };

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
        setDisplayMode('home');
        setSearchQuery('');
    };

    return (
        <div className="app">
            <Header
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                currentPage={currentPage}
                displayMode={displayMode}
                onPageChange={handlePageChange}
                onDisplayModeChange={handleDisplayModeChange}
                favoriteCount={favoriteProducts.length}
                cartCount={cartProducts.length}
            />
            <main className="main-content">
                {renderContent()}
                {renderOverlay()}
            </main>
            <Footer />
        </div>
    );
};

export default App;