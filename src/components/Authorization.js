import React from "react";
import history from "../history";
import Modal from "./Modal";

const renderActions = () => {
  return (
    <button className="ui large green button" onClick={() => history.push("/")}>
      Go Back
    </button>
  );
};

const Authorization = props => {
  return (
    <div>
      <Modal
        dismiss={() => history.push("/")}
        title="Un-Authorized Action"
        content="You are not authorized to perform this action."
        actions={renderActions()}
      />
    </div>
  );
};

export default Authorization;
