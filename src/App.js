import "./App.css";
import Tone from "tone";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "./store.js";
import KickTrigger from "./KickTrigger.jsx";
import SnareTrigger from "./SnareTrigger.jsx";
import SnarePattern from "./SnarePattern.jsx";
import KickPattern from "./KickPattern";
import SetBPM from "./SetBPM";

class UnconnectedApp extends Component {
  start = () => {
    Tone.Transport.start();
  };
  stop = () => {
    Tone.Transport.stop();
  };
  render() {
    Tone.Transport.bpm.value = this.props.bpm;
    return (
      <div className="App">
        DRUMMER
        <button onClick={this.start}>START</button>
        <button onClick={this.stop}>STOP</button>
        <SnareTrigger />
        <SnarePattern />
        <KickTrigger />
        <KickPattern />
        <SetBPM />
      </div>
    );
  }
}
let mapStateToProps = state => ({
  bpm: state.bpm
});

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
