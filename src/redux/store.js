import { configureStore } from "@reduxjs/toolkit";
import articlesReducers from "./reducers/articles";
import rolesReducers from "./reducers/role";

export default configureStore({
    reducer: {
        articles: articlesReducers,
        roles: rolesReducers,
    },
});
