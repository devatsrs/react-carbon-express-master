//import { _ } from 'underscore';

var _ = require('underscore');

export function dataTableRowtoJson(row) {

    if (_.isUndefined(row)) {
        return {};
    }
    // console.log("row");
    // console.log(row);
    // console.log("_.isUndefined(row.cells)");
    // console.log(_.isUndefined(row.cells));
    // console.log("typeof(row.cells)");
    // console.log(typeof (row.cells) === "undefined");

    var data = [];
    if (!_.isUndefined(row.cells) && row.cells.length > 0) {

        row.cells.forEach((element) => {

            if (!_.isUndefined(element) && !_.isUndefined(element.info.header) && !_.isUndefined(element.value)) {

                data[element.info.header] = element.value
            }

        });
        return data;
    }
    console.log(data);




}

