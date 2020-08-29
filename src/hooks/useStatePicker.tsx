import React, { useState, useMemo, useCallback } from "react";
import { StatePicker, IStatePickerProps } from "../components/StatePicker/StatePicker";
import { DropdownOnSearchChangeData, DropdownItemProps } from "semantic-ui-react";


export const useStatePicker = () => {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState<DropdownItemProps | undefined>(undefined);
  const onSearchChange = useCallback((event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
    setQuery(data.searchQuery)
  }, [setQuery])
  const onLabelClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, data: DropdownItemProps) => {
    setValue(data)
    setQuery(data.text ? data.text.toString() : "")
  }, [setValue, setQuery]);
  const FinalStatePicker = useMemo(() => (props: Omit<IStatePickerProps, 'onSearchChange' | 'onLabelClick'>) => (
    <StatePicker {...props} onSearchChange={onSearchChange} onSelectOption={onLabelClick} />
  ), [onSearchChange, onLabelClick])
  return {
    StatePicker: FinalStatePicker,
    query,
    setQuery,
    value,
    setValue
  }
}