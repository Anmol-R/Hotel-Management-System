import React from "react";
import Update from "../components/update/Update";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const UpdatePage = () => {
  const { id } = useParams();
  return (
    <div>
      <Header />
      <Update id={id} />
    </div>
  );
};

export default UpdatePage;
 