import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/user-slice";
import courseReducer from "./feature/course/course-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  migrate: (state) => {
    console.log("Migration Running!");
    return Promise.resolve(state);
  },
};

const coursePersistConfig = {
  key: "course",
  storage: storage,
  blacklist: ["section"],
};
const rootReducer = combineReducers({
  course: persistReducer(coursePersistConfig, courseReducer),
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const reducers = combineReducers({
//   user: userReducer,
//   course: persistConfig(coursePersistConfig, courseReducer),
// });
// const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);


