import React from "react";
import preloader from "../../../assets/images/preloader.svg";

const Preloader = React.memo(props => {
  return <img src={preloader} alt="preloader" />;
});

export default Preloader;
