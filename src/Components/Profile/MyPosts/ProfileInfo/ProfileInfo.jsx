import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import userPhoto from "../../../../assets/images/default-img.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = React.memo(({ profile, updateStatus, status }) => {
  if (!profile) {
    return <Preloader />;
  } else {
    return (
      <div className={s.content}>
        <div className={s.descriptionBlock}>
          <img alt="avatar" src={profile.photos.large || userPhoto} />
          <ProfileStatusWithHooks
            status={status}
            updateStatus={updateStatus}
            profile={profile}
          />
        </div>
      </div>
    );
  }
});

export default ProfileInfo;
