import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import '../App.css';
import ExportToExcel from "./exportToExcel.component";


export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    }
  }

  render() {
    let data = this.state.items.data.table.values;
    let columns = this.state.items.data.table.columns;
    return (
      <div className='dataTable'>
        <ReactTable
          className="-striped -highlight"
          data={data}
          filterable
          columns={columns}
          defaultPageSize={5}
        >
          {(state, makeTable, instance) => {
            this.reactTable = state.pageRows.map(modem => { return modem._original });
            return (
              <div>
                {makeTable()}
                <ExportToExcel items={this.reactTable}/>
              </div>
            )
          }}
        </ReactTable>
      </div>

    );
  }
}
