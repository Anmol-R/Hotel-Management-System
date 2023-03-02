import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/card/Card";
import { Filter, MyContext } from "../components/filter/Filter";

const BookingsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let medData = useContext(MyContext);

  useEffect(() => {
    fetchData();
  }, [medData]);

  console.log(medData);
  const { first, second } = { medData };

  const fetchData = async () => {
    if (!medData) {
      fetch(`http://localhost:8000/search`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setData(jsonData);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } else {
      fetch(`http://localhost:8000/search/?first=${first}&second=${second}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setData(jsonData);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div style={{ marginTop: "6rem" }}>
          {data.map((value) => (
            <Card
              key={value._id}
              name={value.username}
              roomType={value.roomType}
              roomNumber={value.roomNumber}
              startTime={value.startTime}
              endTime={value.endTime}
              date={value.date}
              active={value.bookingActive}
              id={value._id}
              fetchData={fetchData}
            />
          ))}
        </div>
      )}
      <div style={{ display: "none" }}>
        <Filter data={MyContext} />
      </div>
    </div>
  );
};

export default BookingsPage;
