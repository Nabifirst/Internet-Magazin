import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/Token";

const productsAPI = "http://localhost:3000/api/products"
const categoriesAPI = "http://localhost:3000/api/categories"
const subCategoriesAPI = "http://localhost:3000/api/subCategories"
const brandsAPI = "http://localhost:3000/api/brands"

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async function(){
        try {
            const { data } = await axiosRequest.get(productsAPI)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async function(){
        try {
            const { data } = await axiosRequest.get(categoriesAPI)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getSubCategories = createAsyncThunk(
    "subCategories/getSubCategories",
    async function(){
        try {
            const { data } = await axiosRequest.get(subCategoriesAPI)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getBrands = createAsyncThunk(
    "brands/getBrands",
    async function(){
        try {
            const { data } = await axiosRequest.get(brandsAPI)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.post(productsAPI, {title: e.title,price:e.price,categories:e.categories,brands:e.brands,subCategories:e.subCategories,img:e.img})
            dispatch(getProducts())
        } catch (error) {
            console.log(error)
        }
    }
)

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.post(categoriesAPI, {name: e.name, img: e.img})
            dispatch(getCategories())
        } catch (error) {
            console.log(error)
        }
    }
)

export const addSubCategory = createAsyncThunk(
    "subCategories/addSubCategory",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.post(subCategoriesAPI, {name: e.name, img: e.img})
            dispatch(getSubCategories())
        } catch (error) {
            console.log(error)
        }
    }
)

export const addBrand = createAsyncThunk(
    "brands/addBrand",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.post(brandsAPI, {name: e.name, img: e.img})
            dispatch(getBrands())
        } catch (error) {
            console.log(error)
        }
    }
)


export const editProduct = createAsyncThunk(
    "products/editProduct",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.put(`${productsAPI}/${e.id}`, e)
            dispatch(getProducts())
        } catch (error) {
            console.log(error);
        }
    }
)


export const editCategory = createAsyncThunk(
    "categories/editCategory",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.put(`${categoriesAPI}/${e.id}`, e)
            dispatch(getCategories())
        } catch (error) {
            console.log(error);
        }
    }
)

export const editSubCategory = createAsyncThunk(
    "subCategories/editSubCategory",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.put(`${subCategoriesAPI}/${e.id}`, e)
            dispatch(getSubCategories())
        } catch (error) {
            console.log(error);
        }
    }
)

export const editBrand = createAsyncThunk(
    "brands/editBrand",
    async function(e, {dispatch}){
        try {
            const { data } = await axiosRequest.put(`${brandsAPI}/${e.id}`, e)
            dispatch(getBrands())
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async function(id, {dispatch}){
        try {
            const { data } = await axiosRequest.delete(`${productsAPI}/${id}`)
            dispatch(getProducts())
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async function(id, {dispatch}){
        try {
            const { data } = await axiosRequest.delete(`${categoriesAPI}/${id}`)
            dispatch(getCategories())
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteSubCategory = createAsyncThunk(
    "subCategories/deleteSubCategory",
    async function(id, {dispatch}){
        try {
            const { data } = await axiosRequest.delete(`${subCategoriesAPI}/${id}`)
            dispatch(getSubCategories())
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async function(id, {dispatch}){
        try {
            const { data } = await axiosRequest.delete(`${brandsAPI}/${id}`)
            dispatch(getBrands())
        } catch (error) {
            console.log(error);
        }
    }
)

export const market = createSlice({
    name: "market",
    initialState: {
        products: [],
        categories: [],
        subCategories: [],
        brands: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            console.log(error);
        })


        builder.addCase(getCategories.pending, (state, action) => {

        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            console.log(error);
        })


        builder.addCase(getSubCategories.pending, (state, action) => {

        })
        builder.addCase(getSubCategories.fulfilled, (state, action) => {
            state.subCategories = action.payload
        })
        builder.addCase(getSubCategories.rejected, (state, action) => {
            console.log(error);
        })


        builder.addCase(getBrands.pending, (state, action) => {

        })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload
        })
        builder.addCase(getBrands.rejected, (state, action) => {
            console.log(error);
        })
    }
})

// export const {  } = market.actions

export default market.reducer