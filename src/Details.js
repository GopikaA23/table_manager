import React from "react";
import _ from "lodash";
import { useTableContext } from "./TableContext";

const Details = () => {
  const { header, details } = useTableContext();
  const data = _.mapKeys(
    details,
    (_value, key) => _.find(header, (row) => row.name === key).label
  );

  return (
    <>
      {_.size(details) > 0 && (
        <div className="details-page">
          {_.map(data, (value, key) => (
            <p key={key}>{`${key} : ${value}`}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Details;
