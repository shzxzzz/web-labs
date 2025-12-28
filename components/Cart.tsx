import React from 'react';
import type { Product } from '../types';
import { HeartIcon2, DeleteIcon, PlusIcon, MinusIcon } from './Icons';

interface CartProps {
    cartItems: Product[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onToggleSelect: (id: number) => void;
    onToggleFavorite: (id: number) => void;
    onRemoveItem: (id: number) => void;
    onSelectAll: () => void;
    onRemoveAll: () => void;
    onBuyNow: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
                                       cartItems,
                                       onUpdateQuantity,
                                       onToggleSelect,
                                       onToggleFavorite,
                                       onRemoveItem,
                                       onSelectAll,
                                       onRemoveAll,
                                       onBuyNow
                                   }) => {
    const selectedItems = cartItems.filter(item => item.isSelected);
    const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = selectedItems.reduce((sum, item) => {
        if (item.originalPrice) {
            return sum + ((item.originalPrice - item.price) * item.quantity);
        }
        return sum;
    }, 0);
    const total = subtotal - discount;

    const allSelected = cartItems.length > 0 && cartItems.every(item => item.isSelected);

    return (
        <div className="cart-page">
            <h1 className="page-title">Корзина</h1>

            <div className="cart-container">
                <div className="cart-items-section">
                    <div className="cart-controls">
                        <label className="select-all">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={onSelectAll}
                            />
                            <span>Выбрать всё</span>
                        </label>
                        <button className="remove-all-btn" onClick={onRemoveAll}>
                            <DeleteIcon />
                        </button>
                    </div>

                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className={`cart-item ${item.isSelected ? 'selected' : ''}`}>
                                <div className="cart-item-image">
                                    <div className="image-checkbox-wrapper">
                                        <div className="image-placeholder small">
                                            <input
                                                type="checkbox"
                                                className="cart-image-checkbox"
                                                checked={item.isSelected || false}
                                                onChange={() => onToggleSelect(item.id)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="cart-item-content">
                                    <div className="cart-item-header">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <div className="cart-item-price-info">
                                            {item.originalPrice && (
                                                <span className="cart-original-price">₽{item.originalPrice}</span>
                                            )}
                                            <span className="cart-current-price">₽{item.price}</span>
                                        </div>
                                    </div>

                                    <div className="cart-item-actions-row">
                                        <div className="cart-item-buttons">
                                            <button
                                                className={`cart-favorite-btn ${item.isFavorite ? 'active' : ''}`}
                                                onClick={() => onToggleFavorite(item.id)}
                                            >
                                                <HeartIcon2 filled={item.isFavorite} />
                                            </button>
                                            <button
                                                className="cart-delete-btn"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                            <button
                                                className="cart-buy-btn"
                                                onClick={() => onBuyNow(item.id)}
                                            >
                                                Купить
                                            </button>
                                        </div>

                                        <div className="cart-item-quantity">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                            >
                                                <MinusIcon />
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => onUpdateQuantity(item.id, Math.min(10, item.quantity + 1))}
                                                disabled={item.quantity >= 10}
                                            >
                                                <PlusIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-summary-section">
                    <h2>Твоя корзина</h2>

                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Товары ({totalItems} шт.)</span>
                            <span>₽{subtotal.toLocaleString('ru-RU')}</span>
                        </div>

                        {discount > 0 && (
                            <div className="summary-row discount">
                                <span>Скидка</span>
                                <span>-₽{discount.toLocaleString('ru-RU')}</span>
                            </div>
                        )}

                        <div className="summary-row total">
                            <span>Итого</span>
                            <span>₽{total.toLocaleString('ru-RU')}</span>
                        </div>
                    </div>

                    <button
                        className="checkout-btn"
                        disabled={totalItems === 0}
                        onClick={() => totalItems > 0 && alert('Заказ оформлен!')}
                    >
                        Заказать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;