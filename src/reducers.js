const DEFAULT_STATE = {
  projects: [],
  counters: [],
  current_project: {}
}

export const store = (state = DEFAULT_STATE, action) => {
  const {type, payload} = action;
  switch(type) {
    case "SET_PROJECTS": {
      return {
        ...state,
        projects: payload
      }
    }

    case "PROJECT_LOADED": {
      return {
        ...state,
        ...payload
      }
    }

    default:
      return state;
  }
}