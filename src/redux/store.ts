// import { configureStore } from "@reduxjs/toolkit";
// import testReducer from "./features/testSlice"

// export const store = configureStore({
//     reducer: {
//         tests: testReducer
//     }
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; // Ensure this is correctly pointing to your API setup file
import userReducer from "./features/userSlice"; // Correct path for your user slice
import facilityReducer from "./features/facilitySlice"; // Correct path for your facility slice

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add your API reducer
    user: userReducer, // Add your user slice
    facility: facilityReducer, // Add your facility slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add API middleware for caching and invalidation
});

// Types for Redux hooks and selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
