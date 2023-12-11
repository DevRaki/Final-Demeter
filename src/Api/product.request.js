import axios from "./Axios.js";

export const getProductsRequest = () => axios.get('/product');
export const getProductRequest = (ID_Product) => axios.get(`/product/${ID_Product}`);  
export const createProductsRequest = (product) => axios.post('/product', product);
export const statusProductsRequest = (ID_Product) => axios.put(`/product/toggle/${ID_Product}`);
export const updateProductsRequest = (ID_Product, product) => axios.put(`/product/${ID_Product}`, product)
export const deleteProductsRequest = (ID_Product) => axios.delete(`/product/${ID_Product}`);