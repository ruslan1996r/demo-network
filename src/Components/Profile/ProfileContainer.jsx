import React from "react";
import Profile from "./Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUserProfile,
  getStatus,
  updateStatus
} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.aouthorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  render() {
    return (
      <div>
        <Profile
          {...this.props} // передаёт все пропсы дочернему компоненту
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    status: state.profilePage.status,
    profile: state.profilePage.profile,
    aouthorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getUserProfile, updateStatus, getStatus }
  ),
  withRouter,
  withAuthRedirect //Обёртка с помощью HOC на редирект
)(ProfileContainer);
