import React from 'react'

const Sector = ({x=0, y=0, bcg}) => {
    console.log(bcg);
    return (
        <div className="mailField-sector" style={{left:x*25+'px', top:y*30+'px'}}>{bcg}</div>
    )
}

export default Sector;
