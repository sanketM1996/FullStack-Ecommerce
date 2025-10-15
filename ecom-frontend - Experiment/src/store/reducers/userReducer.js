const initialState = {
  users: [],
  singleUser: null,
  pagination: {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: false
  },
  loading: false,
  error: null,
    success: false,  
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return { ...state, loading: true, error: null };
    case "IS_SUCCESS":
      return { ...state, loading: false };
    case "IS_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_USERS":
      return {
        ...state,
        users:
          action.pageNumber === 0
            ? action.payload
            : [...state.users, ...action.payload],
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "GET_USER_BY_ID":
      return { ...state, singleUser: action.payload };

    case "CREATE_USER":
      return {
        ...state,
        success: true,
        users: [action.payload, ...state.users],
      };

    case "UPDATE_USER":
      return {
        ...state,
        success: true,
        users: state.users.map((u) =>
          u.userId === action.payload.userId ? action.payload : u
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.userId !== action.payload),
      };

    case "CLEAR_SINGLE_USER":
      return { ...state, singleUser: null };

    case "RESET_SUCCESS":             // ✅ add this
      return { ...state, success: false };

    default:
      return state;
  }
};


