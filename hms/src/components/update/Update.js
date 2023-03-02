import React, { useState } from "react";
import Swal from "sweetalert2";

const Update = ({ id }) => {
  const [stTime, setStTime] = useState("");
  const [endTime, setEndTime] = useState([]);
  const [eTime, setETime] = useState("");
  const [rmType, setRmType] = useState("");
  const [rmNo, setRmNo] = useState([]);
  const [updateRm, setUpdateRm] = useState("");
  const [date, setDate] = useState("");
  const [res, setRes] = useState("");

  const time = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  const roomType = ["dormatory", "sharing", "apartment"];
  const pricing = {
    dormatory: 400,
    sharing: 600,
    apartment: 800,
  };

  const handleSubmit = (event) => {
    const data = {
      date: date,
      startTime: stTime,
      endTime: eTime,
      roomType: rmType,
      roomNumber: updateRm,
    };
    event.preventDefault();
    if (stTime && endTime && rmType && rmNo && date) {
      fetch(`http://localhost:8000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setRes(data);
          console.log(data);
          Swal.fire("Updated", `Updated`, "success");
        })
        .catch((error) => console.error(error));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...!",
        text: "Fill Every Options!",
        confirmButtonText: "Close",
      });
    }
  };

  const handleOption2Change = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "dormatory") {
      setRmNo([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else if (selectedValue === "sharing") {
      setRmNo([1, 2, 3, 4, 5, 6]);
    } else if (selectedValue === "apartment") {
      setRmNo([1, 2, 3, 4]);
    } else {
      setRmNo([]);
    }
    setRmType(selectedValue);
  };

  const handleOption1Change = (event) => {
    const selectedValue = event.target.value;
    setStTime(selectedValue);
    const filteredOptions = time.filter(
      (option) => parseInt(option) > parseInt(selectedValue)
    );
    setEndTime(filteredOptions);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ padding: "0 1rem" }}>Update</h2>
        <div className="form-row">
          <select value={stTime} onChange={handleOption1Change}>
            {time.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={eTime}
            onChange={(event) => setETime(event.target.value)}
          >
            {endTime.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <select value={rmType} onChange={handleOption2Change}>
            {roomType.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={updateRm}
            onChange={(event) => setUpdateRm(event.target.value)}
          >
            {rmNo.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default Update;
