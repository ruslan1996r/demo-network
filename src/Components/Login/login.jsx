import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/CustomFields/CustomFields";
import { required, maxLengthCreator } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "../common/CustomFields/CustomFields.module.css";

//LoginReduxForm - в данном случае это контейнерная компонента над LoginForm. Что-то вроде HOC

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ handleSubmit, error }) => {
  /* смотри в CustomFields */
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required, maxLength30], Input)}
      {createField("Password", "password", [required], Input, "password")}
      {createField(null, "rememberMe", [], Input, "checkbox", "Remember me")}
      <div>
        <button>Login</button>
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to="profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
      <div>my login - dshmc27@gmail.com</div>
      <div>my pass - w38eqwdop3oqw</div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
