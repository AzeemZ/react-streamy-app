import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";
import Authorization from "../Authorization";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  renderContent() {
    const { isSignedIn } = this.props.auth;

    if (!isSignedIn && isSignedIn !== null) {
      return (
        <div>
          <Authorization />
        </div>
      );
    }

    return (
      <div>
        <h1>Create a Stream</h1>
        <div className="ui segment">
          <StreamForm onSubmit={this.onSubmit} buttonText="Create Stream" />
        </div>
      </div>
    );
  }

  render() {
    return <div style={{ marginTop: "30px" }}>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { createStream }
)(StreamCreate);
