import React from "react";
import _ from "lodash";
import { useTableContext } from "./TableContext";

const Details = () => {
  const { details } = useTableContext();
  return (
    <>
      {_.size(details) > 0 && (
        <div className="details">
          {_.map(details, (row) => (
            <div key={row.id}>
              <p>ID: {row.id}</p>
              <p>Name: {row.name}</p>
              <p>Description: {row.description}</p>
              <p>Should Cook: {row.shouldCook ? "Yes" : "No"}</p>
              <p>Nutrition: {row.nutrition}</p>
              <p>Count: {row.count}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Details;
