import React, { useEffect, useState } from "react";
import "./Filter.css";

export var MyContext = React.createContext(null);
export const Filter = () => {
  const [stTime, setStTime] = useState("");
  const [endTime, setEndTime] = useState([]);
  const [eTime, setETime] = useState("");
  const [rmType, setRmType] = useState("");
  const [rmNo, setRmNo] = useState([]);
  const [bookRm, setBookRm] = useState("");
  const [main, setMain] = useState("");
  const [data, setData] = useState("");

  const roomType = ["dormatory", "sharing", "apartment"];
  const time = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
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
    const filteredOptions = time.filter(
      (option) =>
        parseInt(option.slice(0, 2)) > parseInt(selectedValue.slice(0, 2))
    );
    setStTime(selectedValue);
    setEndTime(filteredOptions);
  };

  const onSubmit = () => {
    if (main === "roomNo And roomType") {
      setData({
        roomNumber: bookRm,
        roomType: rmType,
      });
      MyContext.Provider.value = data;
      console.log(MyContext.Provider.value);
    } else if (main === "startTime And endTime") {
      setData({
        endTime: eTime,
        startTime: stTime,
      });
      MyContext.Provider.value = data;
      console.log(MyContext.Provider.value);
    } else {
      setData({});
    }
    console.log(data);
  };

  return (
    <MyContext.Provider value={data}>
      <div className="filter-container">
        <select
          name="mainSelect"
          className="filter-select main-filter"
          onChange={(event) => setMain(event.target.value)}
        >
          <option value="roomNo And roomType">RoomNo and RoomType</option>
          <option value="startTime And endTime">StartTime and EndTime</option>
        </select>
        <div className="filter-content">
          {main === "roomNo And roomType" ? (
            <>
              <select
                onChange={(event) => handleOption2Change(event)}
                className="filter-select"
                value={rmType}
              >
                {roomType.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                onChange={(event) => setBookRm(event.target.value)}
                className="filter-select"
                value={bookRm}
              >
                {rmNo.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              <br />
              <button
                className="filter-btn"
                type="submit"
                onClick={() => onSubmit()}
              >
                Apply
              </button>
            </>
          ) : (
            <div className="filter-content">
              <select
                onChange={(event) => handleOption1Change(event)}
                className="filter-select"
              >
                {time.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              <select
                onChange={(event) => setETime(event.target.value)}
                className="filter-select"
                value={eTime}
              >
                {endTime.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              <br />
              <button
                className="filter-btn"
                onClick={() => onSubmit()}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </MyContext.Provider>
  );
};

var ex = { Filter, MyContext };
export default ex;
