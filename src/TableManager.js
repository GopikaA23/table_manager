import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableManager = () => {
  return (
    <div>
      <table className="table">
        <TableHeader />
        <TableBody />
      </table>
      <TableFooter />
    </div>
  );
};

export default TableManager;
