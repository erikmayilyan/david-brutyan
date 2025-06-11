import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from '../../../utils/baseURL';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: 'include'
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({ 
        category, 
        language,  
        color, 
        season,
        minprice, 
        maxprice, 
        page = 1, 
        limit = 10 
      }) => {
        // Construct query parameters
        const queryParams = new URLSearchParams();

        if (category) {
          queryParams.append('category', category);
        }
        
        if (color) {
          queryParams.append('color', color);
        }

        if (season) {
          queryParams.append('season', season);
        }

        if (minprice && !isNaN(minprice)) {
          queryParams.append('minprice', minprice);
        }

        if (maxprice && !isNaN(maxprice)) {
          queryParams.append('maxprice', maxprice);
        }

        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());
        queryParams.append('language', language);

        console.log('Final Query Params:', queryParams.toString());

        return `/?${queryParams.toString()}`;
      },
      providesTags: ["Products"]
    }),
    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }]
    }),
    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/create-product',
        method: "POST",
        body: newProduct,
        credentials: "include"
      }),
      invalidatesTags: ["Products"]
    }),
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`
    }),
    updateProduct: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include"
      }),
      invalidatesTags: ["Products"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }]
    })
  })
});

export const { 
  useFetchAllProductsQuery, 
  useFetchProductByIdQuery, 
  useAddProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation, 
  useFetchRelatedProductsQuery 
} = productsApi;

export default productsApi;
