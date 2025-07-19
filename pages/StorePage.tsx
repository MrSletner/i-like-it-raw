
import React, { useState } from 'react';
import Header from '../components/Header';
import { products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { Product, CartItem } from '../types';

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden flex flex-col">
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-white">{product.title}</h3>
            <p className="text-sm text-brand-primary">{product.type}</p>
            <p className="text-sm text-slate-400 my-2 flex-grow">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
                <button onClick={() => onAddToCart(product)} className="bg-brand-primary text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-teal-600 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);

const CartView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    
    const handleCheckout = () => {
        alert(`Checkout total: $${getCartTotal().toFixed(2)}\n(This is a demo. No payment will be processed.)`);
        clearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
            <div className="flex-grow" onClick={onClose}></div>
            <div className="bg-brand-bg border-t-2 border-brand-primary p-4 max-h-[75vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                {cartItems.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">Your cart is empty.</p>
                ) : (
                    <div className="overflow-y-auto flex-grow">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center space-x-4 mb-4">
                                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-white">{item.title}</p>
                                    <p className="text-sm text-slate-400">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                     <input type="number" value={item.quantity} onChange={e => updateQuantity(item.id, parseInt(e.target.value, 10))} className="w-14 bg-slate-700 text-white rounded p-1 text-center"/>
                                     <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {cartItems.length > 0 && (
                     <div className="border-t border-slate-800 pt-4 mt-auto">
                        <div className="flex justify-between items-center text-lg font-bold text-white">
                            <span>Total</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-brand-primary text-white py-3 rounded-md mt-4 font-semibold hover:bg-teal-600 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const StorePage: React.FC = () => {
    const { addToCart } = useCart();
    const [isCartVisible, setIsCartVisible] = useState(false);
    
    const handleAddToCart = (product: Product) => {
        addToCart(product);
        setIsCartVisible(true);
    };

    return (
        <div>
            <Header title="Store" subtitle="Merch, Music & Art" />
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </div>
            {isCartVisible && <CartView onClose={() => setIsCartVisible(false)} />}
        </div>
    );
};

export default StorePage;
