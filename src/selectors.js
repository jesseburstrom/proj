import { createSelector } from "reselect";
export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

export const getFlutterSettings = (state) => state.flutter;

export const getUser = (state) => state.user;

export const getMemes = (state) => state.memes.data;
export const getMemesLoading = (state) => state.memes.isCompletedLoading;

export const getLanguage = (state) => state.language;

export const getCodes = (state) => state.codes.data;
export const getIsLoadingCodes = (state) => state.codes.isLoading;
export const getIsCompletedLoadingCodes = (state) => state.codes.isCompletedLoading;


export const getBricks = (state) => (state.bricks.data);

export const getGameSize = (state) => (state.bricks.gameSize);
