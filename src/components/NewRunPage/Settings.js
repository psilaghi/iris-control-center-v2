import * as React from 'react';
import ApiClient from '../apiClient';
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

  render(){
    return (
      <div>
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
      </div>
    );
  }
 }

export default Settings;
