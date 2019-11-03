import React from "react";
import s from "./Post.module.css";

const Post = props => {
  return (
    <div className={s.item}>
      <img
        src="https://www.stickpng.com/assets/images/58486a72849cf46a2a931338.png"
        alt="pepe"
      />
      {props.message}
      <div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  );
};

export default Post;
