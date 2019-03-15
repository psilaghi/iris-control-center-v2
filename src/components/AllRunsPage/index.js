import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import styled from 'styled-components';
import * as moment from 'moment';
import Icon from '../Icon';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Container = styled.div`
  /* overflow: auto; */
`
const SubContainer = styled.div`
  /* overflow: auto; */
  /* height: 400px; */
  /* padding: 50px; */
`
const StatusCell = styled.div`
  ${props => props.failedTests ? `
    background-color: #FB003B;
    :before {
      content: "${props.failedTests}";
    }
  ` : `
    background-color: #30E60B;
    :before {
      content: "✓";
    }
  `}
  color: white;
  display: flex;
  font-size: 19px;
  font-weight: bold;
  justify-content: center;
  width: 40px;
  height: 100%;
  align-items: center;
`;
const Logo = styled.img`
  height: 27px;
`;
const SortIconsContainer = styled.div`
  display: none;
  /* visibility: hidden; */
  float: right;
`;
const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;
const DeleteButton = styled.button`
  border: none;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  :hover {
    border-radius: 50%;
    background: rgba(0,96,223,0.15);
  }
  visibility: hidden;
`;
const DeleteAllButton = styled.button`
  height: 32px;
  width: 132px;
  border: none;
  border-radius: 4px;
  background-color: rgba(12,12,13,0.1);
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  :hover:not(:disabled) {
    background: #979797;
  }
  :disabled {
    opacity: 0.6;
  }
  float: right;
  margin-right: 50px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TrashIcon = styled(Icon)`
  margin-left: 12px;
`

const TABLE_COLUMNS = [{
  accessor: "failed",
  Cell: data => <StatusCell failedTests={data.value} ...{data.value && {title: `${data.value} Failed`}} />,
  className: "table__cell table__cell--centered status-cell"
}, {
  Header: () => (
    <HeaderCell>
      <span>App</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
  accessor: "target",
  Cell: data => <Logo src={`/images/${data.value}.png`} />,
  className: "table__cell table__cell--centered"
}, {
  Header: () => (
    <HeaderCell>
      <span>ID #</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
  accessor: "id",
  className: "table__cell table__cell--centered"
}, {
  Header: () => (
    <HeaderCell>
      <span>Locale</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
  accessor: "locale",
  className: "table__cell table__cell--centered"
}, {
  Header: () => (
    <HeaderCell>
      <span>Total Tests</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
  accessor: "total",
  className: "table__cell table__cell--centered"
}, {
  Header: () => (
    <HeaderCell>
      <span>Duration</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
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
  Header: () => (
    <HeaderCell>
      <span>Completed</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
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

  handleDelete = (id) => {
    ApiClient.delete(`/delete?${id}`);
    this.setState({runs: this.state.runs.filter(run => run.id !== id)});
  }

  handleDeleteAll = () => {
    ApiClient.delete(`/deleteAll`);
    this.setState({runs: []});
  }

  submitDeleteAll = () => {
    confirmAlert({
      title: 'Delete All Runs',
      message: 'Permanently delete all runs? This cannot be undone.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.handleDeleteAll()
        },
        {
          label: 'Cancel',
        }
      ]
    })
  };

  getColumns = () => [
    ...TABLE_COLUMNS,
    {
      id: "actions",
      Cell: data => {
        console.log(data);
        return (<DeleteButton type="button" onClick={() => this.handleDelete(data.original.id)}><Icon icon="trashcanblue"/></DeleteButton>)
      },
      className: "table__cell table__cell--centered",
      sortable: false
    }
  ]

  render() {
    return (
      <Container className="page">
        <SubContainer>
          <ReactTable
            data={this.state.runs}
            columns={this.getColumns()}
            className="-highlight"
            defaultSorted={[
              {
                id: "ID",
                desc: true
              }
            ]}
            resized={[{
              "id": "failed",
              "value": 40},
              {
              "id": "target",
              "value": 60},
              {
              "id": "actions",
              "value": 40}
            ]}
            showPagination={false}
            resizable={false}
            minRows={0}
            {...(!this.state.runs.length && {
              TbodyComponent: () => (<div className="no-data-tbody">No test results yet.</div>),
              NoDataComponent: () => null
            })}
          />
          <DeleteAllButton
            type="button"
            title="Delete all runs from local disk"
            onClick={this.submitDeleteAll}
            disabled={!this.state.runs.length}
          >
            Delete All
            <TrashIcon icon="trashcanblack"/>
          </DeleteAllButton>
        </SubContainer>
      </Container>
    )
  }
}

export default AllRunsPage;
