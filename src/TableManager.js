import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableManager = ({ nutritionList, header }) => {
  return (
    <div>
      <table className="table">
        <TableHeader header={header} />
        <TableBody options={nutritionList} header={header} />
      </table>
      <TableFooter />
    </div>
  );
};

export default TableManager;
