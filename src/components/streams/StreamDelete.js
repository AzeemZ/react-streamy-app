import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";
import Authorization from "../Authorization";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          className="ui large red button"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <button className="ui large button" onClick={() => history.push("/")}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  renderModalContentText() {
    const { stream } = this.props;

    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${stream.title}?`;
  }

  renderContent() {
    const { auth } = this.props;
    const { stream } = this.props;

    if (!stream) {
      return;
    } else if (stream.userId !== auth.userId) {
      return (
        <div>
          <Authorization />
        </div>
      );
    } else {
      return (
        <Modal
          dismiss={() => history.push("/")}
          title="Delete Stream"
          content={this.renderModalContentText()}
          actions={this.renderActions()}
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
