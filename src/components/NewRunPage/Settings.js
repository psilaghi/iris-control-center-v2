import * as React from 'react';
import ApiClient from '../apiClient';
import styled from 'styled-components';
import {
  Checkbox,
  Select
} from '../inputs';

const DropdownItems = [
  'firefox',
  'locale',
  'mouse'
 ];
 
 const CheckboxItems = [
  'email',
  'highlight',
  'override',
  'report',
  'save'
 ]

 const Title = styled.h1`
  color: #737373;
  font-size: 28px;
  font-weight: normal;
`;
const ContentContainer = styled.div`
  box-sizing: border-box;
  padding: 33px;
`;
const LaunchButton = styled.button`
  background-color: #45a1ff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  color: white;
  font-size: 21px;
  height: 62px;	
  margin: 20px;
  width: 192px;	
`;

 class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {}
    };
  }
  
  componentDidMount() {
    ApiClient.get('/data/all_args.json').then(response => {
      const defaults = {};
      for (let key in response) {
        defaults[key] = (response[key].type === 'bool' ? (response[key].default === 'true') : response[key].default);
      }
      this.setState({
        args: response
      });
    });
  }

  handleChange = (name, value) => {
    this.props.onSelect(
      {
        ...this.props.selections,
        [name]: value
      }
    );
  }

  handleLaunch = () => {
    ApiClient.post('/go',this.state.newRun);
  }

  render(){
    return (
      <ContentContainer>
        <LaunchButton type="button" onClick={this.handleLaunch}>Launch Tests</LaunchButton>
        <Title>
          Settings
        </Title>
        <div>
          {DropdownItems.map(item =>
            this.state.args[item] && (
              <Select
                key={item}
                label={this.state.args[item].label}
                name={item}
                options={this.state.args[item].value}
                value={this.props.selections[item]}
                onChange={this.handleChange}
              />
            )
          )}
        </div>

        <div>
          {CheckboxItems.map(item =>
            this.state.args[item] && (
              <Checkbox
                key={item}
                label={this.state.args[item].label}
                name={item}
                checked={this.props.selections[item] || false}
                onChange={this.handleChange}
              />
            )
          )}
        </div>
      </ContentContainer>
    );
  }
 }

export default Settings;
