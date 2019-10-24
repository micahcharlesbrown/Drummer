import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSetBPM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: ""
    };
  }

  submitHandler = event => {
    event.preventDefault();
    if (isNaN(this.state.bpm)) return;
    if (this.state.bpm < 20 || this.state.bpm > 240) return;
    this.props.dispatch({
      type: "setBpm",
      bpm: this.state.bpm
    });
  };

  onChangeHandler = event => {
    this.setState({ bpm: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          className="bpmBox"
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.bpm}
        ></input>
        <input className="transportButton" type="submit" value="set"></input>
      </form>
    );
  }
}

let SetBPM = connect()(UnconnectedSetBPM);

export default SetBPM;
