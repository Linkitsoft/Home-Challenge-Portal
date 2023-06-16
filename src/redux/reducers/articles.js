import { createSlice } from "@reduxjs/toolkit";
import { ArticleData } from "../../utils/ArticleData";

const initialState = {
    ArticleData
};

const articles = createSlice({
    name: "articles",
    initialState,
    reducers: {
        addArticle: (state, { payload }) =>
        {
            state.ArticleData = [...state.ArticleData, payload];
        },
        updateArticle: (state, { payload }) =>
        {
            const index = state.ArticleData.findIndex(elem => elem.id === payload.id);
            if (index !== -1)
            {
                state.ArticleData[index] = { ...state.ArticleData[index], ...payload };
            } else
            {
                state.ArticleData.push(...payload);
            }
        },
        removeArticle: (state, { payload }) =>
        {
            const NewData = state.ArticleData.filter((item) => item.id !== payload);
            state.ArticleData = NewData
        },
    },
});

export const {
    addArticle,
    removeArticle,
    updateArticle
} = articles.actions;

export default articles.reducer;