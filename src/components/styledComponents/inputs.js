import styled from 'styled-components';

export const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  padding: 0 0 10px 0;
`;

export const InputLabel = styled.label`
  overflow: hidden;
  padding: 0 15px;
  test-align: left;
  text-overflow: ellipsis;
  width: 150px;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid gray;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 15px;

  &:disabled {
    background-color: light-gray;
    border-color: gray;
    color: gray;
  }
`;
