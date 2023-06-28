import React from "react";
import Tilt from "react-parallax-tilt";

let Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt>
        <div className="  br2 shadow-2" style={{ 
            height: "100px",
         width: "100px", 
         backgroundColor: "darkgreen" }}>
            <img src={''} alt='user name' />
          <h1> 👀 robofriend</h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
