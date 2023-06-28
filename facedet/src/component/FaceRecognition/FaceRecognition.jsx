import React from "react";
import './faceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" atl="" src={`${imageUrl}`} width="500px" />
        <div
          className="bounding_box"
          style={{
            left: box.leftCol,
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
          }}
        >
         
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
