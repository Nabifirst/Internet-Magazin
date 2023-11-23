import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosRequest } from "../utils/Token";


export const getProducts = createApi({
    baseQuery:axiosRequest,
    reducerPath:"products",
    tagTypes:["products"],
    endpoints:(build)=>({
        getProduct:build.query({
            query:()=>"products",
            providesTags:(result)=>result
            ?
            [
              ...result.map(({id})=>({type:"products",id})),
              {type:"products",id:"LIST"}
            ]
            :
            [{type:"products",id:"LIST"}]
        }),
        deleteProducts: build.mutation({
            query: (id) => ({
              url: `products/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["products"],
          }),
          addProducts: build.mutation({
            query: (body) => ({
              url: "products",
              method: "POST",
              body,
            }),
            invalidatesTags: ["products"],
          }),
          editProduct: build.mutation({
            query(body){
              return {
                url:`products/${body.id}`,
                method:"PUT",
                body,
              }
            },
            invalidatesTags:["products"]
          }),
    })
})


export const {useGetProductQuery,useDeleteProductsMutation, useAddProductsMutation, useEditProductMutation } = getProducts

