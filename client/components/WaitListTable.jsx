import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow }
  from '@material-ui/core';
import WaitListTableItem from './WaitListTableItem';

export default class WaitListTable extends React.Component {

  render() {
    const waitList = this.props.waitList;
    const waitListItems = waitList.map(waiting => {
      return <WaitListTableItem key={waiting.waitId} root={waiting}/>;
    });
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Party Size</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Wait Time</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waitListItems}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}