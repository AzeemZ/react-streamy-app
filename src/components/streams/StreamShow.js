import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  buildPlayer() {
    if (this.flvPlayer || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.flvPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui segment" style={{ height: "85vh" }}>
          <div className="ui active inverted dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "40px" }}>
        <video ref={this.videoRef} style={{ width: "100%" }} controls></video>
        <div className="ui large segment">
          <div className="content">
            <div className="header">
              <h3>{this.props.stream.title}</h3>
            </div>
            <div className="description">{this.props.stream.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
