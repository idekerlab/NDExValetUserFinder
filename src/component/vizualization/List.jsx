
import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

class List extends React.Component {

  constructor(props) {
    super(props)
  }

  time(T) {
    var d = new Date(0)
    d.setUTCSeconds(T/1000.0)
    return d.toLocaleDateString()
  }

  isSelected(I) {
    return this.props.cart.has(this.props.networkSummaries.get(I))
  }

  handleSelection = (S) => {
    const ns = this.props.networkSummaries
    S.map((N) => {
      if (!this.props.cart.has(ns.get(N))) {
        this.props.cartActions.addNetwork(ns.get(N))
      }
    })
  }

  render() {
    const networkSummaries = this.props.networkSummaries.toJS()
    const tableStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      width: "100%",
      justifyContent: 'space-around',
      overflow: 'scroll'
    }
    return (
      <Table
        style={{ height: '100%' }}
        wrapperStyle={{ overflow: 'scroll', height: '100%' }}
        multiSelectable={true}
        onRowSelection={this.handleSelection}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Owner</TableHeaderColumn>
            <TableHeaderColumn>Edges</TableHeaderColumn>
            <TableHeaderColumn>Nodes</TableHeaderColumn>
            <TableHeaderColumn>Created</TableHeaderColumn>
            <TableHeaderColumn>Modified</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {networkSummaries.map((N, I) => (
            <TableRow
              selectable={!this.isSelected(I)}
              selected={this.isSelected(I)}
            >
              <TableRowColumn>{N.name}</TableRowColumn>
              <TableRowColumn>{N.owner}</TableRowColumn>
              <TableRowColumn>{N.edgeCount}</TableRowColumn>
              <TableRowColumn>{N.nodeCount}</TableRowColumn>
              <TableRowColumn>{this.time(N.creationTime)}</TableRowColumn>
              <TableRowColumn>{this.time(N.modificationTime)}</TableRowColumn>
            </TableRow>)
          )}
        </TableBody>
      </Table>
    )
  }

}

const ListViz = {
  vizName: 'reorder',
  viz: List
}

export default ListViz
