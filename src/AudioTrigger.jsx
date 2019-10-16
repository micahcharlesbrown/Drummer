import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";

class UnconnectedAudioTrigger extends Component {
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

  playKick = (note, time) => {
    let kick = new Tone.MembraneSynth().toMaster();
    kick.envelope.decay = 0.1;
    kick.envelope.attack = 0.05;
    kick.triggerAttackRelease(note, "32n", time);
    return;
  };

  start = sequence => {
    this.setState(this.state);
    Tone.Transport.scheduleRepeat(this.oneStep, "16n");
    Tone.Transport.start();
  };

  stop = () => {
    this.index = 0;
    Tone.Transport.stop();
  };

  oneStep = time => {
    let step = this.index % 32;
    if (this.props.snare[step] !== null) {
      this.playSnare(this.props.snare[step], time);
    }
    if (this.props.kick[step] !== null) {
      this.playKick(this.props.kick[step], time);
    }
    this.index++;
  };

  index = 0;

  render() {
    return (
      <div>
        <button onClick={this.start}>START Pattern</button>
        <button onClick={this.stop}>STOP</button>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  snare: state.snareSequence,
  kick: state.kickSequence
});

let AudioTrigger = connect(mapStateToProps)(UnconnectedAudioTrigger);

export default AudioTrigger;
