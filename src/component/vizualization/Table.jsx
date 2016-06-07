
import React from 'react'

import { Map } from 'immutable'

import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table'

import 'react-bootstrap-table/css/react-bootstrap-table.css'
import '../../style/react-bootstrap-table-helper'

class Table extends React.Component {

  time(T) {
    var d = new Date(0)
    d.setUTCSeconds(T/1000.0)
    return d.toLocaleDateString()
  }

  getSelectedRows() {
    console.log("Called get selected")
    const cart = this.props.cart.toJS()
    return cart.map(N => {
      return N.name
    })
  }

  handleSelection(NWS, NW, isSelected) {
    const index = NWS.indexOf(NW)
    const network = this.props.networkSummaries.get(index)
    if (!isSelected) {
      this.props.cartActions.deleteNetwork(network)
    } else {
      this.props.cartActions.addNetwork(network)
    }
  }

  render() {
    const networkSummaries = this.props.networkSummaries.toJS()
    var networks = networkSummaries.map(N => {
      N.modificationTime = this.time(N.modificationTime)
      N.creationTime = this.time(N.creationTime)
      return N
    })
    const selectRow = {
      mode: 'checkbox',
      onSelect: this.handleSelection.bind(this, networkSummaries),
      selected: this.getSelectedRows(),
      search: true,
      multiColumnSearch: true,
      striped: true
    }
    return (
      <div style={{ height: '80%' }}>
        <BootstrapTable
          data={networks}
          selectRow={selectRow}
          striped={true}
          pagination={true}
          height="95%"
          columnFilter={true}
        >
          <TableHeaderColumn dataField="name"
            width="400px"
            isKey={true}
            dataSort={true}
            columnFilter={true}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="owner"
            dataSort={true}
            columnFilter={true}
          >
            Owner
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="visibility"
            dataSort={true}
            columnFilter={true}
          >
            Visibility
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="edgeCount"
            dataSort={true}
          >
            Edges
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nodeCount"
            dataSort={true}
          >
            Nodes
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="creationTime"
            width="120px"
            dataSort={true}
          >
            Created
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="modificationTime"
            width="120px"
            dataSort={true}
          >
            Modified
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

const TableViz = {
  iconName: 'reorder',
  plugin: Table
}

export default TableViz
