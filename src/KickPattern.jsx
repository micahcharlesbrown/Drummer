import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";
import "./gridVisuals.css";

class UnconnectedKickPattern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.kick
    };
  }

  updateKickPattern = index => {
    let oldPattern = this.props.kick;
    if (oldPattern[index] === null) {
      oldPattern[index] = "e1";
      this.props.dispatch({
        type: "changeKickPattern",
        newPattern: oldPattern
      });
      this.setState(this.state);
      return;
    }
    oldPattern[index] = null;
    this.props.dispatch({
      type: "changeKickPattern",
      newPattern: oldPattern
    });
    this.setState(this.state);
  };

  isActive = index => {
    if (this.props.step === index && this.props.kick[index] === null) {
      return "playing";
    }
    if (this.props.kick[index] === null) {
      return "";
    }
    if (this.props.step === index && this.props.kick[index] !== null) {
      return "activeButton playing";
    }
    return "activeButton";
  };

  RenderSequence = () => {
    return this.props.kick.map((note, index) => {
      if (index % 4 !== 0) {
        return (
          <div
            key={index}
            className={"button " + this.isActive(index)}
            onClick={() => {
              this.updateKickPattern(index);
            }}
          ></div>
        );
      } else {
        return (
          <div
            key={index}
            className={"four " + this.isActive(index)}
            onClick={() => {
              this.updateKickPattern(index);
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
  kick: state.kickSequence,
  step: state.step
});

let KickPattern = connect(mapStateToProps)(UnconnectedKickPattern);

export default KickPattern;
