import React from 'react';
import type { Product } from '../types';
import { HeartIcon2, TagIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    onToggleFavorite: (id: number) => void;
    onToggleCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onToggleFavorite,
                                                     onToggleCart
                                                 }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <div className="image-placeholder"></div>

                <button
                    className="product-favorite-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                    }}
                    aria-label={product.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                >
                    <HeartIcon2 filled={product.isFavorite} />
                </button>
            </div>

            <div className="product-info">
                <div className="price-container">
                    <div className="price-main">
            <span className="current-price">
              {product.originalPrice && (
                  <span className="tag-icon">
                  <TagIcon />
                </span>
              )}
                ₽{product.price}
            </span>
                        {product.originalPrice && (
                            <span className="original-price">₽{product.originalPrice}</span>
                        )}
                    </div>
                </div>

                <h3 className="product-name">{product.name}</h3>

                <button
                    className={`add-to-cart-btn ${product.isInCart ? 'in-cart' : ''}`}
                    onClick={() => onToggleCart(product)}
                    style={{ height: '40px' }}
                >
                    {product.isInCart ? 'В корзине' : 'В корзину'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;