import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import Authorization from "../Authorization";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.stream.id, formValues);
  };

  renderLoader() {
    return (
      <div className="ui segment" style={{ height: "50vh" }}>
        <div className="ui active inverted dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    );
  }

  renderContent() {
    const { auth } = this.props;
    const { stream } = this.props;
    const isSignedInCondition = auth.isSignedIn !== null;

    if (!stream) {
      return this.renderLoader();
    } else if (isSignedInCondition && stream.userId !== auth.userId) {
      return (
        <div>
          <Authorization />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Edit a Stream</h1>
          <div className="ui segment">
            <StreamForm
              onSubmit={this.onSubmit}
              buttonText="Update Stream"
              initialValues={_.pick(this.props.stream, "title", "description")}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div style={{ marginTop: "30px" }}>{this.renderContent()}</div>;
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
  { editStream, fetchStream }
)(StreamEdit);
