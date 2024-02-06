import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/reducer";
import transferReducer from "./transfer/reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    transfer: transferReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
