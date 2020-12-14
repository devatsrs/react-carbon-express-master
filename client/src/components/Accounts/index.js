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
  Pagination,
} from "carbon-components-react";
import React, { Component } from "react";

import { ArrowRight16, Edit16 } from "@carbon/icons-react";
import { Modal, TextInput } from 'carbon-components-react';

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

import moment from "moment";

import { accountService } from "../../Services";
import { EditModal } from "./edit.modal";

export default class Accounts extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    rowData: [],
    headerData: [],
    paginationPage: 1,
    paginationPageSize: 20,
    paginationPageSizes: [10, 20, 30, 40, 50],
    totalItems: 0,
    modalSize: 'sm',
    modalOpen: false,

  };

  componentDidMount() {
    this.refresh();
  }

  openEditModal(open) {

    this.setState({ modalOpen: open });
  }
  closeEditModal() {

    this.openEditModal(false);
  }

  refresh() {

    accountService.getAll({

      page: this.state.paginationPage,
      size: this.state.paginationPageSize

    })
      .then(response => {
        //console.log("acc screen");

        //console.log(response);


        this.setState({
          rowData: response.data,
          headerData: response.header,
          paginationPageSize: response.data_count,
          totalItems: response.total_count
        });

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
                style={{ overflow: "visible" }}
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
                        {row.cells.map((cell, index) => {
                          return (<TableCell key={cell.id}>{(index === 6 || index === 7) ? moment.utc(cell.value).format('MMM DD	YYYY HH:mm') : cell.value}</TableCell>)
                        }
                        )}
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

                          <Button
                            style={{ paddingTop: "10px" }}
                            kind="ghost"
                            hasIconOnly
                            renderIcon={Edit16}
                            iconDescription="Edit Account Modal  "
                            size="small"
                            tooltipPosition="left"
                            onClick={() => { this.openEditModal(true) }}
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

        <EditModal size={this.state.modalSize} open={this.state.modalOpen} close={() => this.closeEditModal()} />

      </div>
    );
  }
}
