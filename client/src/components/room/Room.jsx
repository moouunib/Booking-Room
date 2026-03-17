import React, { useState } from 'react'
import '../../style/booking.css'

const Room = ({room}) => {
  
  
  return (
    <div className="">
      {room && (
        <div>
          <h1> {room.roomNumber} </h1>
          <img src={`http://localhost:5000${room.imageUrl[0]}`} alt="" />
        </div>
      )}
    </div>
  );
}

export default Room
