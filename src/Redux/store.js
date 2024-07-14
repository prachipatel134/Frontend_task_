import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import repoSaga from "./repoSaga";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware = createSagaMiddleware();
const store = configureStore({reducer:rootReducer,
    middleware:()=>[sagaMiddleware]
})

sagaMiddleware.run(repoSaga);
export default store;

