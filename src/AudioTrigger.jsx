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
  componentDidMount() {
    this.start();
    setTimeout(this.stop, 100);
  }

  wider = new Tone.StereoWidener();

  playSnare = note => {
    let snare = new Tone.NoiseSynth().toMaster();
    snare.noise.type = "white";
    snare.envelope.decay = 0.1;
    snare.envelope.sustain = 0.1;
    snare.connect(this.wider);
    snare.triggerAttackRelease("32n");
    return;
  };

  playHihat = note => {
    let hat = new Tone.MetalSynth({
      frequency: 800,
      envelope: {
        attack: 0.002,
        decay: 0.3,
        release: 0.01
      },
      harmonicity: 0.8, ///higher value === more clang like hiting an anvil
      modulationIndex: 80,
      resonance: 2000, /// reduces attack
      octaves: 1.5
    }).toMaster();
    hat.frequency = 500;
    hat.volume.value = 2;
    hat.triggerAttackRelease("8n");
    return;
  };

  playKick = (note, time) => {
    let kick = new Tone.MembraneSynth({
      pitchDecay: 0.07,
      octaves: 2,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.0001,
        decay: 0.2,
        sustain: 0.2,
        release: 0.5,
        attackCurve: "linear"
      }
    }).toMaster();
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
    this.props.dispatch({
      type: "setStep",
      step: step
    });
    if (this.props.snare[step] !== null) {
      this.playSnare(this.props.snare[step], time);
    }
    if (this.props.kick[step] !== null) {
      this.playKick(this.props.kick[step], time);
    }
    if (this.props.hihat[step] !== null) {
      this.playHihat(this.props.hihat[step], time);
    }
    this.index++;
  };

  index = 0;

  render() {
    return <div></div>;
  }
}

let mapStateToProps = state => ({
  snare: state.snareSequence,
  kick: state.kickSequence,
  hihat: state.hihatSequence
});

let AudioTrigger = connect(mapStateToProps)(UnconnectedAudioTrigger);

export default AudioTrigger;
