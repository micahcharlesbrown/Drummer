import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";
import "./gridVisuals.css";
import equal from "fast-deep-equal";

class UnconnectedHihatPattern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.hihat
    };
  }

  componentDidUpdate = prevProps => {
    if (!equal(this.props.step, prevProps.step)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.RenderSequence();
    }
  };

  updateHihatPattern = index => {
    let oldPattern = this.props.hihat;
    if (oldPattern[index] === null) {
      oldPattern[index] = "a8";
      this.props.dispatch({
        type: "changeHihatPattern",
        newPattern: oldPattern
      });
      this.setState(this.state);
      return;
    }
    oldPattern[index] = null;
    this.props.dispatch({
      type: "changeHihatPattern",
      newPattern: oldPattern
    });
    this.setState(this.state);
  };

  isActive = index => {
    if (this.props.step === index && this.props.hihat[index] === null) {
      return "playing";
    }
    if (this.props.hihat[index] === null) {
      return "";
    }
    if (this.props.step === index && this.props.hihat[index] !== null) {
      return "activeButton playing";
    }
    return "activeButton";
  };

  RenderSequence = () => {
    return this.props.hihat.map((note, index) => {
      if (index % 4 !== 0) {
        return (
          <div
            key={index}
            className={"button " + this.isActive(index)}
            onClick={() => {
              this.updateHihatPattern(index);
            }}
          ></div>
        );
      } else {
        return (
          <div
            key={index}
            className={"four " + this.isActive(index)}
            onClick={() => {
              this.updateHihatPattern(index);
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
  hihat: state.hihatSequence,
  step: state.step
});

let HihatPattern = connect(mapStateToProps)(UnconnectedHihatPattern);

export default HihatPattern;
