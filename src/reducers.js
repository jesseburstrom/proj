import { INIT_BRICKS, MOVE_BRICK, SET_GAME_SIZE } from "./actions";
import { SET_USER, GET_TOKEN, SET_TOKEN } from "./actions";
import {SAVE_MEME, LOAD_MEMES_SUCCESS, LOAD_MEMES_IN_PROGRESS, LOAD_MEMES_FAILURE } from "./actions";
import { CHANGE_LANGUAGE } from "./actions";
import { SAVE_SETTINGS_FLUTTER } from "./actions";

import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";

import {
  LOAD_CODES_IN_PROGRESS,
  LOAD_CODES_SUCCESS,
  LOAD_CODES_FAILURE,
} from "./actions";

import {
  CHANGE_LOGGING,
  LOAD_LOGS_SUCCESS,
  LOAD_LOGS_IN_PROGRESS,
  LOAD_LOGS_FAILURE,
} from './actions';

export const flutter = (state = [], action) => {
  const { type, payload } = action;
  
  switch (type) {
    case SAVE_SETTINGS_FLUTTER: {
      return payload;
    }
    default:
      return state;
  }
};

const initialLogsState = { isCompletedLoading: false, isLogging: false, data: [] };

export const logs = (state = initialLogsState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CHANGE_LOGGING: {
      return { ...state, isLogging: payload };
    }
    case LOAD_LOGS_SUCCESS: {
      const { logs } = payload;
      console.log("In reducer logs", logs);
      return {
        ...state,
        isCompletedLoading: true,
        data: logs,
      };
    }
    case LOAD_LOGS_IN_PROGRESS:
      return {
        ...state,
        isCompletedLoading: false,
      };
    case LOAD_LOGS_FAILURE:
      return {
        ...state,
        isCompletedLoading: false,
      };
    default:
      return state;
  }
};

export const language = (state = "English", action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CHANGE_LANGUAGE: {
      return payload;
    }
    default:
      return state;
  }
};

const initialMemeState = { isCompletedLoading: false, data: [] };

export const memes = (state = initialMemeState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    
    case SAVE_MEME: {
      const meme = payload;
      return {
        ...state, 
        data: state.data.map(memeOld => {
          return memeOld.id === meme.id ? meme : memeOld;
        }),
      };
    }
    
    case LOAD_MEMES_SUCCESS: {
      const { memes } = payload;
      return {
        ...state,
        isCompletedLoading: true,
        data: memes,
      };
    }
    case LOAD_MEMES_IN_PROGRESS:
      return {
        ...state,
        isCompletedLoading: false,
      };
    case LOAD_MEMES_FAILURE:
      return {
        ...state,
        isCompletedLoading: false,
      };
    default:
      return state;
  }
};

const initialBrickState = { gameSize: 4, data: [] };

export const bricks = (state = initialBrickState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case INIT_BRICKS: {
      return payload;
    }
    case MOVE_BRICK: {
      return {...state, data: setBricks(state.data, payload)};
    }
    case SET_GAME_SIZE: {
      return {...state, gameSize: payload};
    }
    default:
      return state;
  }
};

export const user = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER: {
      return payload;
    }
    default:
      return state;
  }
};

export const token = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TOKEN: {
      return state;
    }
    case SET_TOKEN: {
      return payload;
    }
    
    default:
      return state;
  }
};

function setBricks(oldBricks, id) {
  const newBricks = oldBricks.map((brick) => brick);
  const zeroBrick = oldBricks.find((brick) => brick.value === 0);
  const clickedBrick = oldBricks.find((brick) => brick.id === id);
  const deltaX = zeroBrick.xPos - clickedBrick.xPos;
  const deltaY = zeroBrick.yPos - clickedBrick.yPos;
  // Movable brick iff one step exactly away from zero brick in both directions.
  // If sum >= 2 either diagonal or two(+) steps away. If 0 then clicked on zero brick.
  let animationClass = "";
  if (Math.abs(deltaX) + Math.abs(deltaY) === 1) {
    // Set css animation direction by changing state controlled css property
    // This can possibly be made more compact.
    switch (deltaX) {
      case 0: {
        switch (deltaY) {
          case 1:
            animationClass = "exampleS";
            break;
          default:
            animationClass = "exampleN";
        }
        break;
      }
      case 1:
        animationClass = "exampleE";
        break;
      default:
        animationClass = "exampleW";
    }
    newBricks[zeroBrick.id].value = clickedBrick.value;
    newBricks[clickedBrick.id].value = 0;
    newBricks[zeroBrick.id].animationClass = animationClass;
  }
  return newBricks;
}

const initialTodoState = { isLoading: false, data: [] };

export const todos = (state = initialTodoState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;

      return {
        ...state,
        data: state.data.concat(todo),
      };
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
      };
    }
    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        }),
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      };
    }
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialCodeState = { isCompletedLoading: false, isLoading: false, data: [] };

export const codes = (state = initialCodeState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CODES_SUCCESS: {
      const { codes } = payload;
      return {
        ...state,
        isLoading: false,
        isCompletedLoading: true,
        data: codes,
      };
    }
    case LOAD_CODES_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
        isCompletedLoading: false,
      };
    case LOAD_CODES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isCompletedLoading: false,
      };
    default:
      return state;
  }
};
