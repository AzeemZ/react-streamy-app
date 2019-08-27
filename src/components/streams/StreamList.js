import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAuthButtons(stream) {
    const { userId } = this.props.auth;

    if (stream.userId !== null && stream.userId === userId) {
      return (
        <div className="right floated content">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="ui large primary button"
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui large red button"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderStreamList() {
    const { streams } = this.props;

    if (streams.length === 0) {
      return <div>No stream currently exist</div>;
    }

    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAuthButtons(stream)}
          <i className="big youtube middle aligned icon"></i>
          <div className="content">
            <div className="header">
              <Link to={`streams/${stream.id}`}>{stream.title}</Link>
            </div>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.auth.isSignedIn) {
      return (
        <Link to="/streams/new" className="ui large green button">
          Create Stream
        </Link>
      );
    }
  }

  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        {this.renderCreate()}
        <div className="ui segment">
          <div className="ui big relaxed divided list">
            {this.renderStreamList()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
