import React from "react";
import "./Card.css"; 
import { Link } from "react-router-dom"; 
import Swal from "sweetalert2"; 

const Card = (props) => {
  const {
    name,
    roomType,
    roomNumber, 
    startTime,
    endTime,
    date,
    id,
    fetchData,
    price,
  } = props;

  let deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        Swal.fire(
          "Deleted",
          `Booking with id ${id} deleted successfully`,
          "success"
        );
        fetchData();
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error...!",
          text: data.message,
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error...!",
        text: "Internal server error",
        confirmButtonText: "Close",
      });
    }
  };
  return (
    <div className="card">
      <div className="time">
        <span className="timestamp">{date}</span>
        <span className="timestamp">{startTime}</span>
        <span className="timestamp">{endTime}</span>
        <span className="timestamp">{price}</span>
      </div>
      <div className="content">
        <div className="name">{name}</div>
        <div>
          <span className="room-type">Room Type:</span> {roomType}
        </div>
        <div>
          <span className="room-number">Room Number:</span> {roomNumber}
        </div>
        <div className="actions">
          <Link to={`/update/${id}`}>
            <button className="update-button">Update</button>
          </Link>
          <button className="delete-button" onClick={() => deleteData(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
