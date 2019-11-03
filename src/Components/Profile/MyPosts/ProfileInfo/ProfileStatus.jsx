import React from "react";
// import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      status: this.props.status
    };
  }

  //писать метод стрелочной функцией, чтобы не терялся контекст объявления. В противном случае, пиши BIND
  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = e => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState) {
    //если предыдущий и текущий статусы
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }
  render() {
    return (
      <div>
        {/* <h1>{this.props.profile.fullName}</h1> */}
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "No status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
              onChange={this.onStatusChange}
            ></input>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
