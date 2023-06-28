import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
  return (
    <div className="w-90 flex justify-center flex-wrap-ns flex-row-ns">
      <p className="f3">{"Insert the link to detect a face in your picture"}</p>
      <div className="w-40 flex justify-center">
        <input className="pa2 w-70 center" type="text" onChange={onInputChange}/>
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer"  onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
