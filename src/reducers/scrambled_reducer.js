const scrambledReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_WORD":
      // console.log('state add word', state);
      // console.log('action add word', action);
      return Object.assign({}, state, {
        prevWord: [...state.prevWord, `${action.scrambledWord}`],
        scrambledWord: action.scrambledWord,
        currPointer: state.currPointer + 1
      })
    case "REMOVE_WORD":
      // console.log('state remove word',state);
      const prev = state.prevWord;
      // console.log('prev', prev);
      const prevWords = prev[state.currPointer - 1].split(",");
      // console.log('prevWord', prevWords);
      const newPrev = prev.slice(0, prev.lenght - 1);

      return Object.assign({}, state, {
        prevWord: newPrev,
        currPointer: state.currPointer - 1,
        scrambledWord: prevWords
      });
    default:
      // console.log('once');
      return state;
  }
};

export default scrambledReducer;