/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
} from "carbon-components-react";
//import { initialRows, headers } from "./shared";

//import Pagination from "../../Pagination";

export default (props) => {
  var initialRows = props.rows;
  var inititalPaginationRows = [];

  initialRows.forEach((key, row) => {
    inititalPaginationRows.push({ ...row, id: row.id });
  });

  inititalPaginationRows = inititalPaginationRows.slice(0, 120);

  return (
    <DataTable
      rows={inititalPaginationRows}
      headers={props.headers}
      isSortable={props.isSortable}
      {...props}
      state={DataTable.state}
      render={({
        state,
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getPaginationProps = () => {
          const { paginationPage, paginationPageSize } = this.state;

          return {
            page: paginationPage,
            pageSize: paginationPageSize,
            onChange: this.handlePaginationChange,
          };
        },
        getCurrentPageRows = (rows) => {
          let lastItemIndex = 0;

          let { paginationPage, paginationPageSize } = this.state;

          if (paginationPage === 1 || rows.length <= paginationPageSize) {
            lastItemIndex = paginationPageSize;
            paginationPage = 1;
          } else {
            lastItemIndex = paginationPageSize * paginationPage;
          }
          // If lastItemIndex is larger than rows.length, it wont break
          // It will just go to the end of the array
          return rows.slice(
            (paginationPage - 1) * paginationPageSize,
            lastItemIndex
          );
        },
      }) => {
        const currentPageRows = getCurrentPageRows(rows);
        return (
          <TableContainer title="DataTable" description="With pagination">
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageRows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              {...getPaginationProps()}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={rows.length}
            />
          </TableContainer>
        );
      }}
    />
  );
};
