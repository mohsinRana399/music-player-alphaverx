const initState = {
  completePlaylist: null,
  currentTrack: 0,
};

export default (state = initState, action) => {
  // console.log("action => ", action);
  switch (action.type) {
    case "TRACKS_TO_PLAY":
      return (state = {
        ...state,
        completePlaylist: action.payload,
      });
    case "NOW_PLAYING":
      return (state = {
        ...state,
        currentTrack: action.payload,
      });
    default:
      return state;
  }
};
