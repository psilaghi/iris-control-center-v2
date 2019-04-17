import * as React from 'react';
import ApiClient from '../apiClient';
import 'react-table/react-table.css';
import styled from 'styled-components';
import Icon from '../Icon';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import RunsTable from './RunsTable';
import RunDetails from './RunDetails/';
import { Route } from 'react-router-dom';

const Container = styled.div`
  padding: 50px;
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
    opacity: 0.7;
  }
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 25px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TrashIcon = styled(Icon)`
  margin-left: 12px;
`

class AllRunsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {runs: []};
  }

  componentDidMount() {
    ApiClient.get('/data/runs.json').then(response => this.setState({runs: response.runs}));
  }

  handleDelete = (id) => {
    ApiClient.get(`/delete?${id}`);
    this.setState({runs: this.state.runs.filter(run => run.id !== id)});
  }

  handleDeleteAll = () => {
    ApiClient.get(`/deleteAll`);
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

  render() {
    return (
      <Container>
        <Route path={`${this.props.match.path}/:id`}>
          <RunsTable runs={this.state.runs} onDelete={this.handleDelete}/>
        </Route>
        <ButtonContainer>
          <DeleteAllButton
            type="button"
            title="Delete all runs from local disk"
            onClick={this.submitDeleteAll}
            disabled={!this.state.runs.length}
          >
            Delete All
            <TrashIcon icon="trashcanblack"/>
          </DeleteAllButton>
        </ButtonContainer>
        <Route path={`${this.props.match.path}/:id`}>
          <RunDetails />
        </Route>
      </Container>
    )
  }
}

export default AllRunsPage;
