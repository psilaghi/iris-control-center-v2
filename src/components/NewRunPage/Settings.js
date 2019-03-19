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
const Title = styled.h1`
  color: #737373;
  font-size: 28px;
  font-weight: normal;
  margin: 50px 0 0 0;
`;
const Section = styled.div`
  margin: 18px 0 19px 0;
`;
const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 35px;

  ${LaunchButton} {
    align-self: center;
  }
`;

 class Settings extends React.Component {
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
      <ContentContainer>
        <LaunchButton type="button" onClick={this.props.onLaunch}>Launch Tests</LaunchButton>
        <Title>
          Settings
        </Title>
        <Section>
          {this.props.settings.map(item =>
            item.type==="list" && (
              <Select
                key={item}
                label={item.label}
                name={item.name}
                options={item.value}
                value={this.props.selections[item] || item.default}
                onChange={this.handleChange}
              />
            )
          )}
        </Section>

         {/* <Section>
          {DropdownItems.map(item =>
            this.props.settings[item] && (
              <Select
                key={item}
                label={this.props.settings[item].label}
                name={item}
                options={this.props.settings[item].value}
                value={this.props.selections[item] || this.props.settings[item].value[0]}
                onChange={this.handleChange}
              />
            )
          )}
        </Section> */}



        <Section>
          {this.props.settings.map(item =>
            item.type==="checkbox" && (
              <Checkbox
                key={item}
                label={item.label}
                name={item.name}
                checked={this.props.selections[item] || item.value}
                onChange={this.handleChange}
              />
            )
          )}
        </Section>

        {/* <Section>
          {CheckboxItems.map(item =>
            this.props.settings[item] && (
              <Checkbox
                key={item}
                label={this.props.settings[item].label}
                name={item}
                checked={this.props.selections[item] || false}
                onChange={this.handleChange}
              />
            )
          )}
        </Section> */}
      </ContentContainer>
    );
  }
 }

export default Settings;
