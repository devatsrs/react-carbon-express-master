import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarAction,
  Button,
  TableSelectAll,
  TableSelectRow,
  OverflowMenu,
  OverflowMenuItem,
  Pagination,
} from "carbon-components-react";
import React, { Component } from "react";
//import { this.batchActionClick, rows, headers } from './shared';
import accounts_data from "../../helper/faker/accounts";
import { ArrowRight16, Edit16 } from "@carbon/icons-react";

/**
 *
 *
 * https://github.com/carbon-design-system/carbon-components-react/blob/master/src/components/DataTable/stories/shared.js
 * https://themes.carbondesignsystem.com/component/ui-shell--navigation-with-no-icons.html
 * https://themes.carbondesignsystem.com/?nav=data-table
 * https://the-carbon-components.netlify.app/component/data-table--select.html
 * https://react.carbondesignsystem.com/?path=/docs/datatable-batch-actions--usage
 * https://www.carbondesignsystem.com/components/data-table/usage/
 */
import {
  Delete16 as Delete,
  Save16 as Save,
  Download16 as Download,
} from "@carbon/icons-react";

export default class Accounts extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    rowData: [],
    headerData: [],
    paginationPage: 1,
    paginationPageSize: 50,
    paginationPageSizes: [10, 20, 30, 40, 50],
  };

  componentDidMount() {
    let headerData = [];
    Object.entries(accounts_data[0]).forEach(([key, value]) => {
      if (key !== "id") {
        headerData.push({ key: key, header: key });
      }
    });

    this.setState({ rowData: accounts_data, headerData: headerData });
  }
  action(msg) {
    // alert(msg);
  }
  batchActionClick(msg) {
    //alert(msg);
  }

  handlePaginationChange = (e) => {
    console.log(e);

    this.setState({
      paginationPage: e.page,
      paginationPageSize: e.pageSize,
    });
  };

  render(props) {
    //console.log(accounts_data);
    //    console.log(accounts_data[0]);

    return (
      <div>
        <h2>Accounts</h2>
        <DataTable
          rows={this.state.rowData}
          headers={this.state.headerData}
          page={1}
          pageSize={this.state.paginationPageSize}
          isSortable
          size="compact"
        >
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
            getPaginationProps = () => {
              const { paginationPage, paginationPageSize } = this.state;

              return {
                page: paginationPage,
                pageSize: paginationPageSize,
                //onChange: this.handlePaginationChange,
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

              // console.log( "paginationPage " + paginationPage );
              // console.log( "paginationPageSize " + paginationPageSize );

              // console.log( "lastItemIndex " + lastItemIndex );
              // console.log( "rows " + rows.length );

              return rows.slice(
                (paginationPage - 1) * paginationPageSize,
                lastItemIndex
              );
            },
          }) => (
            <TableContainer
              title=""
              description=""
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={Delete}
                    onClick={this.batchActionClick(selectedRows)}
                  >
                    Delete{" "}
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={Save}
                    onClick={this.batchActionClick(selectedRows)}
                  >
                    Save{" "}
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={Download}
                    onClick={this.batchActionClick(selectedRows)}
                  >
                    Download{" "}
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch
                    defaultExpanded
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                  >
                    <TableToolbarAction onClick={() => alert("Alert 1")}>
                      {" "}
                      Action 1{" "}
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert("Alert 2")}>
                      {" "}
                      Action 2{" "}
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert("Alert 3")}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onClick={this.action("Add new row")}
                    size="small"
                    kind="primary"
                  >
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCurrentPageRows(rows).map((row, i) => (
                    <TableRow key={i} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell className="bx--table-column-menu">
                        <Button
                          kind="ghost"
                          hasIconOnly
                          renderIcon={ArrowRight16}
                          iconDescription="View Account  "
                          size="small"
                          tooltipPosition="right"
                        />

                        <Button
                          style={{ paddingTop: "10px" }}
                          kind="ghost"
                          hasIconOnly
                          renderIcon={Edit16}
                          iconDescription="Edit Account  "
                          size="small"
                          tooltipPosition="right"
                          tooltipDirection="bottom"
                          onClick={() =>
                            this.props.history.push(
                              "/account/" + row.id + "/edit"
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                // {...getPaginationProps}
                page={this.state.paginationPage}
                pageSize={this.state.paginationPageSize}
                pageSizes={this.state.paginationPageSizes}
                totalItems={rows.length}
                onChange={(event) => this.handlePaginationChange(event)}
              />
            </TableContainer>
          )}
        </DataTable>
      </div>
    );
  }
}
