import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../Card/card";
import "./game.css";
const mapStateToProps = state => {
  // console.log('mapStateToProp', state)
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    remove_word: () => dispatch({ type: "REMOVE_WORD" }),
    add_word: scrambledWord =>
      dispatch({
        type: "ADD_WORD",
        scrambledWord
      })
  };
};
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false,
      message: "Try to guess one by one"
    };
  }
  render() {
    let { word, scrambledWord } = this.props;
    let { isHighlighted, message } = this.state;

    return (
      <div>
        {this.renderGame(word, scrambledWord, isHighlighted)}
        {this.renderInfo(message)}
        {this.renderInput()}
      </div>
    );
  }
  componentDidMount() {
    let scrambledWord = this.shuffle(this.props.word.split(""));
    // console.log('didMount', scrambledWord)
    this.props.add_word(scrambledWord);
  }

  renderGame = (word, scrambledWord, isHighlighted) => {
    if (!scrambledWord) return <p>Loading...</p>;
    else
      return (
        <div>
          {scrambledWord.map((letter, index) => {
            return (
              <Card
                letter={letter}
                answer={word.split("")[index]}
                isHighlighted={isHighlighted}
                index={index}
                key={index}
              />
            );
          })}
        </div>
      );
  };
  renderInfo = message => {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "30px"
        }}
      >
        <p style={{ fontSize: 20, textAlign: "center" }}>{message}</p>
      </div>
    );
  };
  renderInput = () => {
    return (
      <div className="input-container">
        <input
          autoFocus
          onKeyDown={this.onKeyDown}
          style={{
            borderWidth: 0,
            backgroundColor: "#444",
            color: "#ffef96",
            outline: "none"
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    );
  };
  shuffle = array => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  arrayMove = (arr, oldIndex, newIndex) => {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

    return arr;
  };
  handleBackspace() {
    let currPointer = this.props.currPointer;
    if (currPointer > 0) {
      this.props.remove_word();
      this.setState({ isHighlighted: false });
    }
  }

  handleInput(key) {
    let { scrambledWord, currPointer } = this.props;

    let letterIndex = scrambledWord.indexOf(key.toLowerCase(), currPointer);
    // console.log('letterIndex', letterIndex);
    if (letterIndex !== -1) {
      let newScrambledWord = this.arrayMove(
        scrambledWord,
        letterIndex,
        currPointer
      );
      this.props.add_word(newScrambledWord);
      this.setState({
        message: "To check the word press Enter. Step back - press Backspace."
      });
    } else {
      this.setState({ message: `Not found: ${key}. Try again!` });
    }
  }
  toggleHighlight() {
    this.setState({ isHighlighted: !this.state.isHighlighted });
  }
  onKeyDown = e => {
    let { key } = e;

    switch (key) {
      case "Enter":
        this.toggleHighlight();
        break;
      case "Backspace":
        this.handleBackspace(key);
        break;
      default:
        this.handleInput(key);
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
