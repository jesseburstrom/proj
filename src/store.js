import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import { bricks, user, token, todos, memes, language, codes } from "./reducers";
import { logActivity } from "./thunks";

const reducers = {
  bricks,
  user,
  token,
  todos,
  memes,
  language,
  codes,
};

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  var result;
  if (typeof action.type !== 'undefined') {
    console.group(action.type);
    if (store.getState().token.length > 0) {
      console.log('dispatching', action);
      console.log(store.getState().token);
      logActivity(action, store.getState().user.id, store.getState().token);  
    }
    
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
  } else {
    result = next(action);
  }
  
  return result
}


const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
  createStore(
    persistedReducer,
    applyMiddleware(logger, thunk)
    //composeWithDevTools(applyMiddleware(logger, thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
