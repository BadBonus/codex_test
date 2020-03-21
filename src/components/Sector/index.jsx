import React from 'react'

const Sector = ({x=0, y=0}) => {
    return (
        <div className="mailField-sector" style={{left:x+'px', right:y+'px'}}>X</div>
    )
}

export default Sector;
