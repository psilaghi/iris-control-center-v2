//https://github.com/jakezatecky/react-checkbox-tree/blob/master/src/js/NodeModel.js
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/index';

const Checkbox = styled.input`
  margin: 10px;
  border-radius: 2px;
  &:hover {
    box-shadow: inset 0px 0px 0px 2px rgba(0,96,223,1);
  }
`;

const ExpandButton = styled.button`
    margin: auto;
    margin-right: 0;
    border: none;
    padding: 10px;
    background: none;
    color: #0060df;
    &:active,
    &:focus {
        outline: none;
        border: none;
    }
    display: flex;
    font-size: 15px;
    /* &:hover {
      color: darkblue;
    } */
`;

const SummaryContainer = styled.span`
    display: flex;
    align-items: center;
    font-size: 20px;
    height: auto;
    min-height: 40px;
    max-height: 55px;
    background-color: #e5effc;
    &:hover {
        background-color: #c4daf7;
    }
`;

const Container = styled.li`
    margin: 8px 0;
    .card-body {
        padding: 0;
    }
    .card {
        border: none;
    }
`;

const Description = styled.div`
  font-size: 12px;
  color: gray;
  margin-left: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
`;

const Label = styled.label`
  margin: 0;
`;

class TreeNode extends React.Component {
    static propTypes = {
        checked: PropTypes.number.isRequired,
        disabled: PropTypes.bool.isRequired,
        expanded: PropTypes.bool.isRequired,
        isLeaf: PropTypes.bool.isRequired,
        treeId: PropTypes.string.isRequired,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        onCheck: PropTypes.func.isRequired,
        onExpand: PropTypes.func.isRequired,
        children: PropTypes.node,
        title: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        children: null,
        title: null,
        onClick: () => {}
    };

    onCheck = () => {
        const { name, onCheck } = this.props;
        onCheck({ name, checked: this.getCheckState({ toggle: true }) });
    };

    onExpand = () => {
        const { expanded, name, onExpand } = this.props;
        onExpand({ name, expanded: !expanded });
    };

    onArrowExpand = () => {
        const { onArrowExpand, name } = this.props;
        onArrowExpand(name);
    };

    getCheckState({ toggle }) {
        const { checked } = this.props;
        // Toggle off or partial state to checked
        if (checked === 0 || checked === 2) {
            return true;
        }
        // Node is already checked and we are not toggling
        if (checked === 1) {
            return false;
        }

        return false;
    }

    render() {
        const {
            disabled,
            expanded,
            isLeaf,
            checked,
            treeId,
            name
        } = this.props;
        const inputId = `${treeId}-${String(name)
            .split(' ')
            .join('_')}`;
        return (
            <Container>
                <SummaryContainer>
                    <Label key={0} htmlFor={inputId}>
                        <Checkbox
                            type="checkbox"
                            disabled={disabled}
                            checked={checked === 1}
                            onClick={this.onCheck}
                            onChange={() => {}}
                        />

                        <span key={1}>{name}</span>
                        {isLeaf && (<Description>{this.props.description}</Description>)}
                    </Label>
                    {isLeaf ? (
                        <ExpandButton
                            type="button"
                            onClick={this.onArrowExpand}
                        >
                            <Icon icon="arrowhead-right" />
                        </ExpandButton>
                    ) : (
                        <ExpandButton type="button" onClick={this.onExpand}>
                            <Icon icon={expanded ? 'close' : 'open'} />
                        </ExpandButton>
                    )}
                </SummaryContainer>
                {expanded && this.props.children}
            </Container>
        );
    }
}
export default TreeNode;
