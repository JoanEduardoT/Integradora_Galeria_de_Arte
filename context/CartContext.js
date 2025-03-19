import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para acceder al contexto fácilmente
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para añadir productos al carrito
    const addToCart = (product) => {
        if (!product.id) {
            console.error("Intentando agregar un producto sin ID:", product);
            return;
        }
    
        setCartItems([...cartItems, product]);
    };

    // CartContext.js

const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
};

    
    return (
        <CartContext.Provider value={{ cartItems, addToCart,removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
