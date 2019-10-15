import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";

class UnconnectedSnareTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.snare
    };
  }

  wider = new Tone.StereoWidener();

  playSnare = note => {
    let snare = new Tone.NoiseSynth().toMaster();
    snare.noise.type = "white";
    snare.envelope.decay = 0.3;
    snare.connect(this.wider);
    snare.triggerAttackRelease("32n");
    return;
  };

  start = sequence => {
    this.setState(this.state);
    Tone.Transport.scheduleRepeat(this.oneStep, "8n");
    Tone.Transport.start();
  };

  stop = () => {
    this.index = 0;
    Tone.Transport.stop();
  };

  oneStep = time => {
    let step = this.index % 16;
    if (this.props.snare[step] !== null) {
      this.playSnare(this.props.snare[step], time);
    }
    this.index++;
  };
  index = 0;

  render() {
    return (
      <div>
        <button onClick={this.start}>START snare</button>
        <button onClick={this.stop}>STOP</button>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  snare: state.snareSequence
});

let SnareTrigger = connect(mapStateToProps)(UnconnectedSnareTrigger);

export default SnareTrigger;
