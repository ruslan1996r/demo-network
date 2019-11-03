import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = state => ({
  isAuth: state.auth.isAuth
});

export const withAuthRedirect = Component => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to={"/login"} />;
      return <Component {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectedAuthRedirectComponent;
};

//HOC. Делает обёртку над компонентой. Берёт component и возвращает его же, но уже какой-то новой возможностью
//Этот HOC даёт всем обёрнутым компонентам возможность редиректа
//HOC может быть как функциональным, так и классовым компонентом
//ConnectedAuthRedirectComponent - HOC, подключённый к redux и потом возвращённый
