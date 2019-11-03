import React, { useState, useEffect } from "react";
// import s from "./ProfileInfo.module.css";

//писать метод стрелочной функцией, чтобы не терялся контекст объявления. В противном случае, пиши BIND

const ProfileStatusWithHooks = React.memo(props => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  //[] - указывает зависимость. Если эти данные меняются, вызывает этот хук
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = e => {
    setStatus(e.currentTarget.value);
  };
  console.log("22");
  return (
    <div>
      <h1>{props.profile.fullName}</h1>
      {!editMode && (
        <div onDoubleClick={activateEditMode}>
          <span>{props.status || "No statuss"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
          ></input>
        </div>
      )}
    </div>
  );
});

export default ProfileStatusWithHooks;

// useEffect вместо componentDidUpdate с такой записью:
// componentDidUpdate(prevProps, prevState) {
//   //если предыдущий и текущий статусы
//   if (prevProps.status !== this.props.status) {
//     this.setState({ status: this.props.status });
//   }
// }
