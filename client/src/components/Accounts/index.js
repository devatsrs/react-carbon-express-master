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
//import accounts_data from "../../helper/faker/accounts";
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

import axios from 'axios';

export default class Accounts extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    rowData: [],
    headerData: [],
    paginationPage: 1,
    paginationPageSize: 10,
    paginationPageSizes: [10, 20, 30, 40, 50],
    totalItems: 0
  };

  componentDidMount() {
    this.refresh();
  }

  refresh() {

    console.log("paginationPage - ", this.state.paginationPage);

    let headerData = [];

    let options = {
      // headers: { 'Authorization': 'Bearer ' + "Token" },
      params: {
        page: this.state.paginationPage,
        size: this.state.paginationPageSize
      },
    }

    axios.get('http://localhost:3000/accounts/all', options)
      .then(res => {
        const response = res.data;

        //   console.log(res.data);
        Object.entries(response.data[0]).forEach(([key, value]) => {
          if (key !== "id") {
            headerData.push({ key: key, header: key });
          }
        });
        Object.entries(response.data).forEach(([key, row]) => {

          response.data[key].id = row.id.toString();

        });

        this.setState({ rowData: response.data, headerData: headerData });

        this.setState({ paginationPageSize: response.totalPages, totalItems: response.totalItems });

        console.log("response.totalPages ", response.totalPages);

      })
  }
  action(msg) {
    // alert(msg);
  }
  batchActionClick(msg) {
    //alert(msg);
  }

  handlePaginationChange = async (e) => {


    await this.setState({
      paginationPage: e.page,
      paginationPageSize: e.pageSize,
    });
    this.refresh();
  };





  render(props) {




    return (
      <div>
        <h2>Accounts</h2>
        -- {this.state.paginationPage} --


        <DataTable
          rows={this.state.rowData}
          headers={this.state.headerData}
          page={this.state.paginationPage}
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
                    {rows.map((row, i) => (
                      <TableRow key={i} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id.toString()}>{cell.value}</TableCell>
                        ))}
                        <TableCell className="bx--table-column-menu">
                          <Button
                            kind="ghost"
                            hasIconOnly
                            renderIcon={ArrowRight16}
                            iconDescription="View Account  "
                            size="small"
                            tooltipPosition="left"
                          />

                          <Button
                            style={{ paddingTop: "10px" }}
                            kind="ghost"
                            hasIconOnly
                            renderIcon={Edit16}
                            iconDescription="Edit Account  "
                            size="small"
                            tooltipPosition="left"
                            onClick={() =>
                              this.props.history.push(
                                "/account/" + row.id.toString() + "/edit"
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
                  totalItems={this.state.totalItems}
                  onChange={(event) => this.handlePaginationChange(event)}
                />
              </TableContainer>
            )}
        </DataTable>
      </div>
    );
  }
}
