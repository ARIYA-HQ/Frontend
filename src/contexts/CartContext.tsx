import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
    id: number;
    cartId: number;
    title: string;
    brand: string;
    unitPrice: number;
    quantity: number;
    image: string;
    selectedColor?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: any) => void;
    removeFromCart: (cartId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: any) => {
        setCart(prev => [...prev, { ...item, cartId: Date.now() }]);
    };

    const removeFromCart = (cartId: number) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
