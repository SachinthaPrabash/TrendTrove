import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { CartContext } from './CartContext';

export const OrderSuccess = () => {


    const { cartClear } = useContext(CartContext);


    useEffect(() => {
        if (window?.location.href.includes('success')) {
            cartClear();
        }
    }, [])


    // useEffect(() => {
    //     // Call the resetProducts function to reset the products state
    //     return () => {
    //         resetProducts();  // Reset the products state to an empty array
    //     };
    // }, []);

    return (
        <>
            <Header />
            <div className="my-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 mx-10">
                    <div className="col-span-2 bg-white p-10 rounded-xl">
                        <div className="text-xl font-extrabold">Thanks for Your Order</div>
                        <div>We will email you when your order will be sent.</div>
                    </div>
                </div>
            </div>
        </>
    )
}
