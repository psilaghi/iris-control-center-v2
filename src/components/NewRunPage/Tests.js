import * as React from 'react';
import styled from 'styled-components';
import CheckboxTree from '../tree/CheckboxTree';

const ContentContainer = styled.div`
    border-right: 1px solid lightgray;
    box-sizing: border-box;
    padding: 50px;
    overflow-y: auto;
`;
const Title = styled.h1`
    color: #737373;
    font-size: 28px;
    font-weight: normal;
    margin-bottom: 40px;
`;
const SelectAllCheckbox = styled.input`
    margin: 10px;
`;
const Span = styled.span`
    font-size: 20px;
`;
const Label = styled.label`
    display: flex;
    align-items: center;
    margin: 0;
`;
const Hr = styled.hr`
    margin: 0;
    background-color: #0060df;
    height: 1px;
`;

class Tests extends React.Component {
    handleSelectAll = event => {
        this.props.onSelect(event.target.checked ? this.props.tests : {});
    };

    render() {
        const { tests } = this.props;
        return (
            <ContentContainer>
                <Title>Tests</Title>
                <Label>
                    <SelectAllCheckbox
                        checked={tests === this.props.selectedItems}
                        type="checkbox"
                        onChange={this.handleSelectAll}
                    />
                    <Span>Select all tests</Span>
                </Label>
                <Hr />
                <CheckboxTree
                    nodes={tests}
                    checked={this.props.checked}
                    expanded={this.props.expanded}
                    onCheck={this.props.onCheck}
                    onExpand={this.props.onExpand}
                    onTestClick={this.props.onTestClick}
                />
            </ContentContainer>
        );
    }
}

export default Tests;
