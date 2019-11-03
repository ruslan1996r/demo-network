import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  let { isAuth, login } = state.auth;
  return {
    isAuth,
    login
  };
};

//В такой форме записи в mapDispatchToProps, thunk`и являются thunkCreators
// a connect делает для них обёртку и потом диспатчит
export default connect(
  mapStateToProps,
  { logout }
)(HeaderContainer);
