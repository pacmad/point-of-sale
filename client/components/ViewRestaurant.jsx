import React from 'react';
import Box from '@material-ui/core/Box';
import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';
import ViewCheckItem from './ViewCheckItem';
import TablePopUp from './TablePopUp';
import {
  Switch,
  Route
} from 'react-router-dom';

export default class ViewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.viewDialog = this.viewDialog.bind(this);
    this.changeTableStatus = this.changeTableStatus.bind(this);
    this.state = {
      dialogOpen: false,
      tableData: {}
    };
  }

  viewDialog(dialogOpen, tableData) {
    console.log('Dialog Viewed');
    console.log(tableData, 'params work too');
    this.setState({
      dialogOpen: dialogOpen,
      tableData: tableData
    });
  }

  changeTableStatus(tableId, newStatus) {
    newStatus = { newStatus: newStatus };
    fetch(`/api/restaurant/${tableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStatus)
    })
      .then(response => {
        console.log('this should update after');
      });
  }

  render() {
    let { path, url } = this.props.match;
    path = path.replace(/\/$/, '');
    url = url.replace(/\/$/, '');
    return (
      <>
        <TablePopUp
          open={this.state.dialogOpen}
          tableData={this.state.tableData}
          viewDialog={this.viewDialog}
          changeTableStatus={this.changeTableStatus}
        />
        <Box display="flex">
          <ViewChecks url={url} />
          <Switch>
            <Route path={`${path}/checkitem/:checkId/:tableId`} component={ViewCheckItem} />
            <Route
              exact path={path}
              render={props => (
                <FloorPlan {...props} viewDialog={this.viewDialog} dialogOpen={this.state.dialogOpen}/>
              )}
            />
          </Switch>
        </Box>
      </>
    );
  }
}
