// Dependencies
import React from "react";

const ListItems = ({ note, performance }) => {
  const renderTextColor = performance ? performance.color : "text-secondary";
  return (
    <div>
      <p className={`h3 pb-3 border-bottom border-secondary ${renderTextColor}`}>{note}</p>
    </div>
  );
};

export default ListItems;
