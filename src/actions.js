///////////////////////////// LANGUAGE /////////////////////////////
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const changeLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload: language,
});
///////////////////////////// MEME /////////////////////////////
export const SAVE_MEME = "SAVE_MEME";
export const saveMeme = (meme) => ({
  type: SAVE_MEME,
  payload: meme,
});

export const LOAD_MEMES = "LOAD_MEMES";
export const loadMemes = () => ({
  type: LOAD_MEMES,
});

export const LOAD_MEMES_IN_PROGRESS = "LOAD_MEMES_IN_PROGRESS";
export const loadMemesInProgress = () => ({
  type: LOAD_MEMES_IN_PROGRESS,
});

export const LOAD_MEMES_SUCCESS = "LOAD_MEMES_SUCCESS";
export const loadMemesSuccess = (memes) => ({
  type: LOAD_MEMES_SUCCESS,
  payload: { memes },
});

export const LOAD_MEMES_FAILURE = "LOAD_MEMES_FAILURE";
export const loadMemesFailure = () => ({
  type: LOAD_MEMES_FAILURE,
});
///////////////////////////// BRICK GAME /////////////////////////////
export const INIT_BRICKS = "INIT_BRICKS";
export const initBricks = (bricks) => ({
  type: INIT_BRICKS,
  payload: bricks,
});

export const MOVE_BRICK = "MOVE_BRICK";
export const moveBrick = (id) => ({
  type: MOVE_BRICK,
  payload: id,
});

export const SET_GAME_SIZE = "SET_GAME_SIZE";
export const setGameSize = (gameSize) => ({
  type: SET_GAME_SIZE,
  payload: gameSize,
});
///////////////////////////// LOGGER /////////////////////////////
export const LOG_ACTIVITY = "LOG_ACTIVITY";
export const logActivity = (activity) => ({
  type: LOG_ACTIVITY,
  payload: activity,
});
///////////////////////////// AUTHENTICATION /////////////////////////////
export const SET_USER = "SET_USER";
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const GET_TOKEN = "GET_TOKEN";
export const getToken = () => ({
  type: GET_TOKEN,
});

export const SET_TOKEN = "SET_TOKEN";
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
///////////////////////////// TODO LIST /////////////////////////////
export const CREATE_TODO = "CREATE_TODO";
export const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: { todo },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = (todo) => ({
  type: REMOVE_TODO,
  payload: { todo },
});

export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
export const markTodoAsCompleted = (todo) => ({
  type: MARK_TODO_AS_COMPLETED,
  payload: { todo },
});

export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
});

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE,
});
///////////////////////////// TODO LIST /////////////////////////////
export const LOAD_CODES_IN_PROGRESS = "LOAD_CODES_IN_PROGRESS";
export const loadCodesInProgress = () => ({
  type: LOAD_CODES_IN_PROGRESS,
});

export const LOAD_CODES_SUCCESS = "LOAD_CODES_SUCCESS";
export const loadCodesSuccess = (codes) => ({
  type: LOAD_CODES_SUCCESS,
  payload: { codes },
});

export const LOAD_CODES_FAILURE = "LOAD_CODES_FAILURE";
export const loadCodesFailure = () => ({
  type: LOAD_CODES_FAILURE,
});

