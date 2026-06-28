import { createContext, useState, useContext, useEffect } from 'react';
import { getProductImageUrl } from '../utils/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    // Nuevo estado para selección
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        // Normalizar imagen: construir URL completa si es necesario
        let image = 'https://via.placeholder.com/50';
        
        if (product.image_url) {
            image = product.image_url;
        } else if (product.image) {
            image = getProductImageUrl(product.image);
        }

        const productWithImage = { ...product, image };

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity, image } // Actualizamos la imagen también
                        : item
                );
            }
            // Al agregar nuevo, lo seleccionamos por defecto
            setSelectedItems(prev => [...prev, product.id]);
            return [...prevItems, { ...productWithImage, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        setSelectedItems(prev => prev.filter(id => id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        setSelectedItems([]);
    };

    // Funciones de selección
    const toggleSelection = (productId) => {
        setSelectedItems(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const selectAll = () => {
        setSelectedItems(cartItems.map(item => item.id));
    };

    const deselectAll = () => {
        setSelectedItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    // Total general (todo el carrito)
    const cartTotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * item.quantity), 0);
    
    // Total seleccionado (para checkout)
    const selectedTotal = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + (Number(item.price || 0) * item.quantity), 0);

    // Items seleccionados (para checkout)
    const checkoutItems = cartItems.filter(item => selectedItems.includes(item.id));

    return (
        <CartContext.Provider value={{
            cartItems,
            selectedItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleSelection,
            selectAll,
            deselectAll,
            cartCount,
            cartTotal,
            selectedTotal,
            checkoutItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
