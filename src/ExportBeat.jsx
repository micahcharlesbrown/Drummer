import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExportBeat.css";

class UnconnectedExportBeat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedSite: {},
      isOpen: false
    };
  }

  modalClassChanger = () => {
    console.log(this.state);
    this.setState({ isOpen: true });
  };
  modalClass = () => {
    if (this.state.isOpen) {
      return "displayBlock";
    } else {
      return "displayNone";
    }
  };

  renderBeat = (sequence, name) => {
    let textify = (x, index) => {
      if (x === null) {
        return index + 1;
      }
      return "hit";
    };
    sequence = name + ": " + sequence.map(textify).join("-");

    return sequence;
  };
  render() {
    return (
      <div>
        <button className="transportButton" onClick={this.modalClassChanger}>
          EXPORT BEAT
        </button>
        <div id="myModal" className={"modal " + this.modalClass()}>
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                this.setState({ isOpen: false });
              }}
            >
              &times;
            </span>
            <p>{this.renderBeat(this.props.hihat, "hihat")}</p>
            <p>{this.renderBeat(this.props.snare, "snare")}</p>
            <p>{this.renderBeat(this.props.kick, "kick")}</p>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  kick: state.kickSequence,
  hihat: state.hihatSequence,
  snare: state.snareSequence
});

let ExportBeat = connect(mapStateToProps)(UnconnectedExportBeat);

export default ExportBeat;
