import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const CryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'ddecef2253msh51991b94fe36979p1ce7c1jsn8525053917dc'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'

const createRequest = (url) =>({url, headers: CryptoNewsHeaders})

export const CryptoNewsApi = createApi({
    reducerPath: 'CryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=>({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&Freshness=Day&count=${count}`)
        }),
    })
})

export const {
    useGetCryptoNewsQuery,
} = CryptoNewsApi