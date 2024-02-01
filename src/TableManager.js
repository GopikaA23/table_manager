import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableManager = ({ optionList, header }) => {
  return (
    <div>
      <table className="table">
        <TableHeader header={header} />
        <TableBody optionList={optionList} />
      </table>
      <TableFooter />
    </div>
  );
};

export default TableManager;
