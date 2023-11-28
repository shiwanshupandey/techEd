import React, { useState, useEffect} from "react";
import "../../components/header/headerPopup.css";
import ClearIcon from "@material-ui/icons/Clear";

function HeaderPopup() {
  const [hidePopup, setHidePopup] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setHidePopup(true);
    }, 5 * 30 * 100); // 5 minutes in milliseconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`headerPopup ${hidePopup ? "hide" : ""}`}>
      <div className="dialogueBox">
        <span className="title">subscribe now! </span>
        <span className="offer">
          | this is just a test pop-up
        </span>
      </div>
      <div
        className="cross"
        onClick={() => { setHidePopup(true);}}
      >
        <ClearIcon className="popupClearIcon" />
      </div>
    </div>
  );
}

export default HeaderPopup;
