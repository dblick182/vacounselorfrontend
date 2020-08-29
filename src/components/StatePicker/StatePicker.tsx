import React, { FunctionComponent, useState, useEffect } from 'react';
import { Dropdown, StrictDropdownProps, DropdownItemProps } from "semantic-ui-react"
import { Text } from "office-ui-fabric-react"
import { stateOptions } from './data'
import styled from 'styled-components';

export interface IStatePickerProps extends Omit<StrictDropdownProps, "options"> {
  onSelectOption?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps) => void
};

const Label = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: rgb(50, 49, 48);
`

const Container = styled.div`
  padding-top:10px;
`

const StyledDropdown = styled(Dropdown)`
  margin-top:5px;
`
const noSelectFn = () => { };

export const StatePicker: FunctionComponent<IStatePickerProps> = (props) => {
  const { onSelectOption = noSelectFn } = props;
  const [options, setOptions] = useState(stateOptions(onSelectOption))
  useEffect(() => {
    setOptions(stateOptions(onSelectOption));
  }, [onSelectOption])

  return (
    <Container className={props.className}>
      <Label>State</Label>
      <StyledDropdown fluid search selection {...props} options={options} />
    </Container>
  )
}