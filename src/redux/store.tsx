import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

const Store = configureStore({
    reducer: rootReducer
})

export default Store;