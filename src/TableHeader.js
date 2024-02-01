import React from "react";
import _ from "lodash";

const TableHeader = ({ header }) => {
  return (
    <thead>
      <tr>
        {_.map(header, (head) => (
          <th key={head}>{head} </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
