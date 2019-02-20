import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledReactTable = styled(ReactTable)`
  padding: 50px;
`;

const TABLE_COLUMNS = [{
  Header: "ID",
  accessor: "id",
  Cell: row => (<Link to={`/runs/${row.value}`}>{row.value}</Link>),
  className: "table__cell table__cell--centered"
}, {
  Header: "Build",
  accessor: "build",
  className: "table__cell table__cell--centered"
}, {
  Header: "Channel",
  accessor: "channel",
  className: "table__cell table__cell--centered"
}, {
  Header: "Failed",
  accessor: "failed",
  className: "table__cell table__cell--centered"
}, {
  Header: "Locale",
  accessor: "locale",
  className: "table__cell table__cell--centered"
}, {
  Header: "Total",
  accessor: "total",
  className: "table__cell table__cell--centered"
}, {
  Header: "Version",
  accessor: "version",
  className: "table__cell table__cell--centered"
}];

class AllRunsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {runs: []};
  }

  componentDidMount() {
    ApiClient.get('/data/all_runs.json').then(response => this.setState({runs: response.runs}));
  }

  handleDelete = (id) => {
    ApiClient.get(`/delete?${id}`);
    this.setState({runs: this.state.runs.filter(run => run.id !== id)});

  }

  _getColumns = () => [...TABLE_COLUMNS, {
      Header: "Actions",
      id: "action",
      accessor: data => data.id,
      Cell: row => (
        <div>
          <Link className="btn btn-primary table__cell-btn" role="button" to={`/runs/${row.value}`}>
            <FontAwesomeIcon icon={faEye} size="lg" />
          </Link>

          <button className="btn btn-danger table__cell-btn" onClick={() => this.handleDelete(row.value)}>
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
        </div>
      ),
      className: "table__cell table__cell--centered"
    }
  ]

  render() {
    return (
      <div className="page">
        <StyledReactTable
          data={this.state.runs}
          columns={this._getColumns()}
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
