import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if (cartProducts?.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    const addProduct = (productId) => {
        setCartProducts(prev => [...prev, productId])
    }

    const removeProduct = productId => {
        setCartProducts(prev => {
            const position = prev.indexOf(productId);
            if (position != -1) {
                const updateCart = prev.filter((val, index) => index !== position);

                if (updateCart.length == 0) {
                    setCartProducts([])
                    localStorage.removeItem('cart')

                }
                return updateCart
            }
            return prev;
        })

    }

    const cartClear = () => {
        setCartProducts([])
        localStorage.removeItem('cart')
    }


    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, cartClear }}>
            {children}
        </CartContext.Provider>
    )
}

