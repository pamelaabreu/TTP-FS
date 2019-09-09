// Dependencies
import React from "react";

const ListItems = ({ note, performance }) => {
  const renderTextColor = performance ? performance.color : "";
  return (
    <div>
      <p className={renderTextColor}>{note}</p>
    </div>
  );
};

export default ListItems;
