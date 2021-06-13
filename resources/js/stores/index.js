import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";

const configureStore = (reducer) => {
    const enhancers = compose(
        applyMiddleware(thunk)
    );

    return createStore(reducer, enhancers);
};

export default configureStore;
