import React from "react";
import "./App.css";
//Изначально все компоненты загружаются при стартовом запуске, но Lazy позволяет отложить их загрузку до рендеринга

import { Route } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/redux-store";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Navbar from "./Components/Navbar/Navbar";
// import DialogsContainer from "./Components/Dialogs/DialogsContainer";
// import UsersContainer from "./Components/Users/UsersContainer";
// import ProfileContainer from "./Components/Profile/ProfileContainer";
import LoginPage from "./Components/Login/login";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import { withSuspense } from "./Hoc/withSuspense";

const DialogsContainer = React.lazy(() =>
  import("./Components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(() =>
  import("./Components/Users/UsersContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./Components/Profile/ProfileContainer")
);
//ui (react), bll (business logic layer - redux), dal (data access layer - thunk, saga)
// exact - точное сравнение URL
// render - отключает жизненные циклы компонента

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            path="/profile/:userId?"
            render={withSuspense(ProfileContainer)}
          />
          <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    );
  }
}

const Settings = () => {
  return (
    <div>
      <button onClick={() => window.dialog.showModal()}>open dialog</button>
      <dialog id="dialog" open={false}>
        <button onClick={() => window.dialog.close()}>close</button>
      </dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  initialized: state.app.initialized
});

let AppContainer = connect(
  mapStateToProps,
  { initializeApp }
)(App);

const MainApp = props => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
