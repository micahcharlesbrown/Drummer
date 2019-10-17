import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";
import "./gridVisuals.css";
import equal from "fast-deep-equal";

class UnconnectedSnarePattern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.snare
    };
  }

  componentDidUpdate = prevProps => {
    if (!equal(this.props.step, prevProps.step)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.RenderSequence();
    }
  };

  updateSnarePattern = index => {
    let oldPattern = this.props.snare;
    if (oldPattern[index] === null) {
      oldPattern[index] = "e5";
      this.props.dispatch({
        type: "changeSnarePattern",
        newPattern: oldPattern
      });
      this.setState(this.state);
      return;
    }
    oldPattern[index] = null;
    this.props.dispatch({
      type: "changeSnarePattern",
      newPattern: oldPattern
    });
    this.setState(this.state);
  };

  isActive = index => {
    if (this.props.step === index && this.props.snare[index] === null) {
      return "playing";
    }
    if (this.props.snare[index] === null) {
      return "";
    }
    if (this.props.step === index && this.props.snare[index] !== null) {
      return "activeButton playing";
    }
    return "activeButton";
  };

  RenderSequence = () => {
    return this.props.snare.map((note, index) => {
      if (index % 4 !== 0) {
        return (
          <div
            key={index}
            className={"button " + this.isActive(index)}
            onClick={() => {
              this.updateSnarePattern(index);
            }}
          ></div>
        );
      } else {
        return (
          <div
            key={index}
            className={"four " + this.isActive(index)}
            onClick={() => {
              this.updateSnarePattern(index);
            }}
          ></div>
        );
      }
    });
  };

  render() {
    return <div className="playGrid">{this.RenderSequence()}</div>;
  }
}

let mapStateToProps = state => ({
  snare: state.snareSequence,
  step: state.step
});

let SnarePattern = connect(mapStateToProps)(UnconnectedSnarePattern);

export default SnarePattern;
