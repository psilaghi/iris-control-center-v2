import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import styled from 'styled-components';
import * as moment from 'moment';
import Icon from '../Icon';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {withRouter} from 'react-router-dom';

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
  float: right;
`;
const HeaderCell = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteButton = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  color: #0060DF;
`;

const TABLE_COLUMNS = [{
  accessor: "failed",
  Cell: data => <StatusCell failedTests={data.value} {...(data.value && {title: `${data.value} Failed`})} />,
  className: "table__cell status-cell"
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
  className: "table__cell"
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
  className: "table__cell"
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
  className: "table__cell"
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
  className: "table__cell"
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

    var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " min " : " min ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  },
  className: "table__cell"
}, {
  Header: () => (
    <HeaderCell>
      <span>Completed</span>
      <SortIconsContainer className="sort-icons">
        <Icon icon="sort"/>
      </SortIconsContainer>
    </HeaderCell>
  ),
  id: "completed",
  accessor: data => moment(data.id, "YYYYMMDDHHmmss").add(data.duration, 's').unix(),
  Cell: data => moment(data.original.id, "YYYYMMDDHHmmss").add(data.original.duration, 's').calendar(),
  className: "table__cell"
}];

class RunsTable extends React.Component {
  getColumns = () => [
    ...TABLE_COLUMNS,
    {
      id: "actions",
      Cell: data => (
        <DeleteButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            this.props.onDelete(data.original.id);
          }}>
          <Icon icon="trashcanblue"/>
        </DeleteButton>),
      className: "table__cell",
      sortable: false
    }
  ]

  render() {
    return (
      <ReactTable
        data={this.props.runs}
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
          "value": 50}
        ]}
        showPagination={false}
        resizable={false}
        minRows={6}
        {...(!this.props.runs.length && {
          TbodyComponent: () => (<div className="no-data-tbody">No test results yet.</div>),
          NoDataComponent: () => null
        })}
        getTrProps={(state, rowInfo, column) => {
          return {
            onClick: () => {this.props.history.push(`/runs/${rowInfo.original.id}`)},
            className: (rowInfo && (this.props.match && this.props.match.params.id === rowInfo.original.id)) ? "selected" : "",
            style: {
              ...(
                rowInfo &&
                (this.props.match && this.props.match.params.id === rowInfo.original.id) &&
                {
                  background: '#0179FF',
                  color: 'white',
                  fontWeight: 'bold'
                })
            }
          }
        }}
      />
    )
  }
}

export default withRouter(RunsTable);
