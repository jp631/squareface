import React from "react";

function Rank({name, entries}) {
    return ( 
        <>
            <div className="white f3">
            {`${name} your current entry is ${entries}`}
         </div>
        </>
   
     );
}

export default Rank;