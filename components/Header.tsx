import React from 'react';
import type { Page, DisplayMode } from '../types';
import { HomeIcon, HeartIcon, CartIcon } from './Icons';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    currentPage: Page;
    displayMode: DisplayMode;
    onPageChange: (page: Page) => void;
    onDisplayModeChange: (mode: DisplayMode) => void;
    favoriteCount: number;
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({
                                           searchQuery,
                                           onSearchChange,
                                           currentPage,
                                           displayMode,
                                           onPageChange,
                                           onDisplayModeChange
                                       }) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onSearchChange(value);

        if (value.trim()) {
            onDisplayModeChange('search');
        } else if (displayMode === 'search') {
            onDisplayModeChange('home');
        }
    };

    const handleFavoritesClick = () => {
        if (displayMode === 'favorites') {
            onDisplayModeChange('home');
        } else {
            onDisplayModeChange('favorites');
        }
    };

    const handleHomeClick = () => {
        onPageChange('home');
        onDisplayModeChange('home');
        onSearchChange('');
    };

    const handleCartClick = () => {
        onPageChange('cart');
        onDisplayModeChange('home');
    };

    return (
        <header className="header">
            <div className="header-content">
                <button
                    className="home-btn"
                    onClick={handleHomeClick}
                    aria-label="Главная"
                >
                    <HomeIcon />
                </button>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <div className="header-actions">
                    <button
                        className={`favorites-btn ${displayMode === 'favorites' ? 'active' : ''}`}
                        onClick={handleFavoritesClick}
                        aria-label="Избранное"
                    >
                        <HeartIcon filled={displayMode === 'favorites'} />
                    </button>

                    <button
                        className={`cart-btn ${currentPage === 'cart' ? 'active' : ''}`}
                        onClick={handleCartClick}
                        aria-label="Корзина"
                    >
                        <CartIcon />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;