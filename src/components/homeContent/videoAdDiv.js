import React from "react";
import "../../components/homeContent/videoAdDiv.css";

function VideoAdDiv() {
  return (
    <div className="videoAdDiv">
      <div className="videoDiv">
        <iframe
          title="Mohamad Alaloush's Story"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          width="1060"
          height="715"
          frameBorder="0"
        ></iframe>
      </div>
      <div className="content">
        <h2 className="heading">Transform your life through education</h2>
        <p className="about">
          Mohamad Alaloush launched a new career in software development by
          taking courses on Udemy. What will you be able to do?
        </p>
      </div>
    </div>
  );
}

export default VideoAdDiv;
