const initialState = {
  currentArtist: null,
  status: "loading",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_INFO": {
      return {
        ...state,
        currentArtist: action.currentArtist,
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_INFO_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
