const initialState = {
    popup: false,
    isLogin: false,
    isLoading: false,
    user: {},
    announcement: [],
    news: []
  }
  
  const reducer = (state=initialState, action) => {
    if(action.type === 'CHANGE_POPUP'){
      return {
        ...state,
        popup: action.value
      }
    }
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        isLogin: action.value
      }
    }
    if(action.type === 'CHANGE_USER'){
        return {
          ...state,
          user: action.value
        }
      }
      if(action.type === 'CHANGE_LOADING'){
        return {
          ...state,
          isLoading: action.value
        }
      }
      if(action.type === 'SET_ANNOUNCEMENT'){
        return {
          ...state,
          announcement: action.value
        }
      }
      if(action.type === 'SET_NEWS'){
        return {
          ...state,
          news: action.value
        }
      }
    return state;
  }

  export default reducer;