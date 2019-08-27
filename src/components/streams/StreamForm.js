import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput({ input, label, meta: { touched, error } }) {
    const errorClassName = error && touched ? "error" : "";

    return (
      <div className={`field ${errorClassName}`}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {touched &&
          (error && (
            <div className="ui basic red pointing prompt label transition visible">
              {error}
            </div>
          ))}
      </div>
    );
  }

  render() {
    return (
      <form
        className="ui big form error"
        onSubmit={this.props.handleSubmit(formValues =>
          this.props.onSubmit(formValues)
        )}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui large button primary">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "You must enter a title";
  }
  if (!values.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
