import { createContext, useContext, useState } from "react";
import { getProductsRequest, getProductRequest, createProductsRequest, statusProductsRequest, updateProductsRequest, deleteProductsRequest } from "../Api/Product.request.js"

const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de los insumos");

    return context;
}

export function Product({ children }) {
    const [product, setProduct] = useState([]);

    const getProduct = async () => {
        try {
            const res = await getProductsRequest();
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getProductDetails = async (id) => {
        try {
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createProduct = async (products) => {
        try {
            const res = await createProductsRequest(products);
            getProduct(res);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleSupplyStatus = async (id) => {
        try {
            const res = await statusProductsRequest(id);

            if (res.status === 200) {
                setProduct((prevProduct) =>
                    prevProduct.map((products) =>
                        products.ID_Product === id ? { ...products, State: !products.State } : products
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (id, product) => {
        try {
            await updateProductsRequest(id, product);
            getProduct(); 
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductsRequest(id)
            if (res.status === 204) setProduct(product.filter(product => product.ID_Product !== id))
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ProductContext.Provider value={{
            product,
            getProduct,
            getProductDetails,
            createProduct,
            toggleSupplyStatus,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}