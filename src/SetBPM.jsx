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
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.bpm}
        ></input>
      </form>
    );
  }
}

let SetBPM = connect()(UnconnectedSetBPM);

export default SetBPM;
