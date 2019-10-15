import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";

class UnconnectedKickTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: undefined
    };
  }

  verb = new Tone.Freeverb(5);

  playKick = (note, time) => {
    let kick = new Tone.MembraneSynth().toMaster();
    kick.connect(this.verb);
    kick.envelope.decay = 0.1;
    kick.envelope.attack = 0.05;
    kick.triggerAttackRelease(note, "32n", time);
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

    if (this.props.kick[step] !== null) {
      this.playKick(this.props.kick[step], time);
    }
    this.index++;
  };
  index = 0;

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.start();
          }}
        >
          START
        </button>
        <button
          onClick={() => {
            this.stop();
          }}
        >
          STOP
        </button>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  kick: state.kickSequence
});

let KickTrigger = connect(mapStateToProps)(UnconnectedKickTrigger);

export default KickTrigger;
