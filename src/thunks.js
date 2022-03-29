import {
  markTodoAsCompleted,
  removeTodo,
  createTodo,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
} from "./actions";

import {
  loadMemesInProgress,
  loadMemesSuccess,
  loadMemesFailure,
} from "./actions";

import {
  loadCodesInProgress,
  loadCodesSuccess,
  loadCodesFailure,
} from "./actions";

export const loadMemes = () => async (dispatch, getState) => {
  try {
    dispatch(loadMemesInProgress());
    const response = await fetch("https://api.imgflip.com/get_memes");
    
    const data = await response.json();
    
    const memes = data.data.memes.map((meme) => {
      return {id: meme.id, topText: "", bottomText: "", imageUrl: meme.url}
    });
    console.log("MEMES!!!", memes);
    dispatch(loadMemesSuccess(memes));
  } catch (e) {
    dispatch(loadMemesFailure());
    dispatch(displayAlert(e));
  }
};

export const loadCodes = (codeUrls) => async (dispatch) => {
  try {
    dispatch(loadCodesInProgress());
    let codes = [];
    codeUrls.forEach(async (url) => {
      await fetch(url).then(r => r.text()).then(text => codes.push({url: url, code: text}));
    });
    console.log("CODES THUNK", codes);
    dispatch(loadCodesSuccess(codes));
  } catch (e) {
    dispatch(loadCodesFailure());
    dispatch(displayAlert(e));
  }
};

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("/todos");
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    console.log("Sending TODO", text);
    const body = JSON.stringify({ text });
    const response = await fetch("/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();

    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const markTodoCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `/todos/${id}/completed`,
      {
        method: "post",
      }
    );
    const updatedTodo = await response.json();
    dispatch(markTodoAsCompleted(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};
export const displayAlert = (text) => () => {
  alert(text);
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/todos/${id}`, {
      method: "delete",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};



export const logActivity =  async (activity, id, token)  => {
  
  try {
    const body = JSON.stringify({ activity });
    console.log("logActivity");
    const response = await fetch(`/api/log/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "post",
      body,
    });
    const result = await response.json();
    console.log(result);
  } catch (e) {
    //dispatch(displayAlert(e));
  }
};

