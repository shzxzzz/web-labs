import React from 'react';
import type { Product } from '../types';
import { HeartIcon2, TagIcon } from './Icons';

interface SearchResultsProps {
    products: Product[];
    onToggleFavorite: (id: number) => void;
    onToggleCart: (product: Product) => void;
    title: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
                                                         products,
                                                         onToggleFavorite,
                                                         onToggleCart,
                                                         title
                                                     }) => {
    return (
        <div className="search-results">
            <div className="search-results-header">
                <h3>{title}</h3>
                <span className="results-count">{products.length} товаров</span>
            </div>

            <div className="results-list">
                {products.map(product => (
                    <div key={product.id} className="result-item">
                        <div className="result-item-info">
                            <span className="result-item-name">{product.name}</span>
                            <div className="result-item-price">
                                <span className="current-price">₽{product.price}</span>
                                {product.originalPrice && (
                                    <span className="original-price">₽{product.originalPrice}</span>
                                )}
                                {product.originalPrice && (
                                    <span className="tag-icon">
                    <TagIcon />
                  </span>
                                )}
                            </div>
                        </div>

                        <div className="result-item-actions">
                            <button
                                className={`result-favorite-btn ${product.isFavorite ? 'active' : ''}`}
                                onClick={() => onToggleFavorite(product.id)}
                                aria-label={product.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                            >
                                <HeartIcon2 filled={product.isFavorite} />
                            </button>

                            <button
                                className={`result-cart-btn ${product.isInCart ? 'in-cart' : ''}`}
                                onClick={() => onToggleCart(product)}
                                aria-label={product.isInCart ? "Убрать из корзины" : "Добавить в корзину"}
                            >
                                {product.isInCart ? '-' : '+'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;