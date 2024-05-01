import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import notebooksReducer from "./notebook";
import notebodiesReducer from "./notebody";
import taskReducer from "./tasks";
import imageReducer from "./images";
import audioReducer from "./audio";
import notesReducer from "./notes";
import findUserReducer from "./finduser";
import sharedNotesReducer from "./sharenote";

const rootReducer = combineReducers({
  session: sessionReducer,
  notes: notesReducer,
  notebook: notebooksReducer,
  notebody: notebodiesReducer,
  tasks: taskReducer,
  images: imageReducer,
  audios: audioReducer,
  findUser: findUserReducer,
  sharedNotes: sharedNotesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
