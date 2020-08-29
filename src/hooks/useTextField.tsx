import React, { FunctionComponent, useState, useCallback, useMemo, useEffect } from "react";
import { TextField, ITextFieldProps } from 'office-ui-fabric-react';


export const useTextField: (initValue?: string) => { TextField: FunctionComponent<ITextFieldProps>, value: string, setValue: React.Dispatch<React.SetStateAction<string>> } = (initVal) => {

  const [value, setValue] = useState("")
  const onTextFieldChange = useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setValue(newValue || "")
  }, [setValue])

  useEffect(() => {
    initVal && setValue(initVal)
  }, [initVal, setValue])
  const FinalTextField = useMemo(() => (props: ITextFieldProps) => (
    <TextField {...props} onChange={onTextFieldChange} />
  ), [onTextFieldChange])

  return {
    TextField: FinalTextField,
    value,
    setValue
  }
}