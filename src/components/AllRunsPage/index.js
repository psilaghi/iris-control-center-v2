import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import styled from 'styled-components';
import * as moment from 'moment';
import Icon from '../Icon';

const StyledReactTable = styled(ReactTable)`
  padding: 50px;
`;
const StatusCell = styled.div`
  background-color: #FB003B;
   ${props => !props.hasFailed && `
    background-color: #30E60B;
   `}
  color: white;
  display: flex;
  font-size: 19px;
  font-weight: bold;
  justify-content: center;
  width: 40px;
`;

const TableCheckIcon = styled(Icon)`
  margin: auto;
`;

const Logo = styled.img`
  height: 27px;
`;

const TABLE_COLUMNS = [{
  accessor: "failed",
  Cell: data => <StatusCell hasFailed={data.value}>
    {hasFailed ? (<TableCheckIcon icon="tablecheck"/>) : {data.value}}
  </StatusCell>,
  className: "table__cell table__cell--centered"
}, {
  Header: "App",
  accessor: "target",
  Cell: data => <Logo src={`/images/${data.value}.png`} />,
  className: "table__cell table__cell--centered"
}, {
  Header: "ID #",
  accessor: "id",
  className: "table__cell table__cell--centered"
}, {
  Header: "Locale",
  accessor: "locale",
  className: "table__cell table__cell--centered"
}, {
  Header: "Total Tests",
  accessor: "total",
  className: "table__cell table__cell--centered"
}, {
  Header: "Duration",
  accessor: "duration",
  Cell: seconds => {
    seconds = Number(seconds.value);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  },
  className: "table__cell table__cell--centered"
}, {
  Header: "Completed",
  Cell: data => moment(data.original.id, "YYYYMMDDHHmmss").add(data.original.duration, 's').calendar(),
  className: "table__cell table__cell--centered"
}];

class AllRunsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {runs: []};
  }

  componentDidMount() {
    ApiClient.get('/data/runs.json').then(response => this.setState({runs: response.runs}));
  }

  render() {
    return (
      <div className="page">
        <StyledReactTable
          data={this.state.runs}
          columns={TABLE_COLUMNS}
          className="-striped -highlight"
          defaultPageSize={5}
          defaultSorted={[
            {
              id: "ID",
              desc: true
            }
          ]}
        />
      </div>
    )
  }
}

export default AllRunsPage;
