import React from "react";
import _ from "lodash";
import { useTableContext } from "./TableContext";

const TableHeader = () => {
  const { header } = useTableContext();
  return (
    <thead>
      <tr>
        {_.map(header, (head) => (
          <th key={head.label}>{head.label} </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
