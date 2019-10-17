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
import AudioTrigger from "./AudioTrigger.jsx";
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
        <h2>DRUMMER</h2>
        <button className="transportButton" onClick={this.start}>
          START
        </button>
        <button className="transportButton" onClick={this.stop}>
          STOP
        </button>
        <AudioTrigger />
        <SnarePattern />
        <br />
        <KickPattern />
        <br />
        Set BPM: <SetBPM />
      </div>
    );
  }
}
let mapStateToProps = state => ({
  bpm: state.bpm
});

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
