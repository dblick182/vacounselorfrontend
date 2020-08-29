import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Icon, IconButton } from "office-ui-fabric-react";

export interface ITeachingPaneProps {
  text: string;
  className?: string;
}

const TeachingPaneContainer = styled.div`
  height:100%;
  width:70%;
  display:flex;
  flex-direction:column;
  justify-content:center;
`

export const TeachingPane = (props: ITeachingPaneProps) => {
  const { text, className } = props;
  return (
    <TeachingPaneContainer className={className}>
      {text}
    </TeachingPaneContainer>
  )
}

export interface IMultiPaneProps {
  panes: ITeachingPaneProps[];
  // onNext?: (props: IMultiPaneProps, paneIndex: number) => void;
  // onBack?: (props: IMultiPaneProps, paneIndex: number) => void;
  onDismiss?: () => void;
}

const TeachingPanesOuterContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-evenly;
  height:100%;
`
const VerticalCenter = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
`

const backIconProps = {
  iconName: "ChevronLeft"
}

const forwardIconProps = {
  iconName: "ChevronRight"
}

export const TeachingPanes = (props: IMultiPaneProps) => {
  const { panes, onDismiss } = props;
  const [paneIndex, setPaneIndex] = useState(0)
  const onNext = useCallback(() => {
    if (paneIndex == panes.length - 1) {
      onDismiss && onDismiss()
    } else {
      setPaneIndex(paneIndex + 1)
    }
  }, [paneIndex, setPaneIndex])
  const onBack = useCallback(() => {
    setPaneIndex(paneIndex - 1)
  }, [paneIndex, setPaneIndex])
  return (
    <TeachingPanesOuterContainer>
      <VerticalCenter>
        <IconButton iconProps={backIconProps} onClick={onBack} disabled={paneIndex == 0} />
      </VerticalCenter>
      <TeachingPane {...panes[paneIndex]} />
      <VerticalCenter>
        <IconButton iconProps={forwardIconProps} onClick={onNext} />
      </VerticalCenter>
    </TeachingPanesOuterContainer>
  )
}