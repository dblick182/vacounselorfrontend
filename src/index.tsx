// Include polyfills necessary for the dependencies of the app
import { Fabric, initializeIcons, PrimaryButton, DefaultButton, Modal, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import React, { FunctionComponent, useState, useCallback, Fragment, useMemo, useRef } from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import './index.scss';
import styled from "styled-components";
import { useTextField } from "./hooks/useTextField";
import { useFindRepresentative } from "./hooks/useFindRepresentative";
import { useFindSenator, ISenatorMember } from "./hooks/useFindSenator"
import 'semantic-ui-css/semantic.min.css'
import { useStatePicker } from './hooks/useStatePicker';
import { ILookupRepresentative } from './hooks/types';
import { Tab } from 'semantic-ui-react'
import { TeachingPanes, ITeachingPaneProps } from './components/TeachingPane/TeachingPane';
initializeIcons();


const PageContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:row;
  justify-content:center;
`;
const FormContainer = styled.div`
  width:66vw;
  height:100vh;
`;
const FormHeading = styled.h1`
  width:100%;
`;
const FormControlsContainer = styled.div`
  width:100%;
  margin:5px;
  display:flex;
  flex-direction:column;
`
const ButtonContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  padding-top:10px;
`

const SpinnerContainer = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
`

const ModalContent = ({ firstName, lastName, senator, onDismissModal }: { firstName: string, lastName: string, senator: ISenatorMember, onDismissModal: () => void }) => {
  const { address } = senator;
  const bodyRef = useRef<any>();
  const onEmailClick = useCallback(() => {
    if (bodyRef.current) {
      /* Select the text field */
      bodyRef.current.select();
      bodyRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      /* Alert the copied text */
      alert("Copied the text to your clipboard");

      /* Open link to senator/congressperson page */
      window.open(emailTo, "_blank")
    }
  }, [bodyRef.current])
  const addressSplit = address.split(" ");
  const streetAddress = addressSplit.slice(0, addressSplit.length - 3).join(" ")
  const secondAddressLine = addressSplit.slice(addressSplit.length - 3).join(" ")
  const { TextField: EmailField, value: emailTo } = useTextField(senator.email);
  const { TextField: BodyField, value: finalBody } = useTextField(`  The Honorable ${senator.first_name} ${senator.last_name}
  ${streetAddress}
  ${secondAddressLine}

  Senator ${senator.last_name}:

    I am one of your constituents who is very concerned about the quality of care for veterans that is being compromised in the VA’s VET Center Program due to excessive clinical production standards that were imposed on counselors by Readjustment Counseling Service (RCS) management, which has adversely effected the health and well-being of counselors and degraded their ability to provide quality services to veterans.  These issues were reported by national media organizations, and the broadcasts with associated web articles can be viewed through links which are available on a Facebook Page that was established to raise awareness regarding this distressing situation (https://www.facebook.com/VaVetCenterQualityCareMatters).

    The consequence of the VET Center Program’s unreasonable clinical performance metrics and excessive administrative workload policies being forced on counselors, combined with a shortage of clinicians, high caseloads, and increased counselor turnover rates; prevent veterans from getting adequate services, and especially puts suicidal veterans at higher risk.  Further, these mandates are not in compliance with the NASW Standards for Social Work Practice in Health Care Settings, and these performance standards exceed what research shows to be harmful to both clinicians and quality of care.  This is unethical and must be rectified to avoid further harm being done to clinical staff, and to mitigate the negative impact this has had on services for veterans and their families.

    If this situation is not resolved, the health and well-being of clinical staff will continue to suffer which will impede their ability to deliver quality care, and this will result in veterans and their families not receiving adequate services which they deserve.  This should not be happening to our veterans and the counselors who care for them; and the VA/VET Center Program must be held accountable for this, and for threats and retaliation against employees who have spoken up to address these issues.

    Therefore, it is requested that you help resolve this matter by considering the following courses of action:
  1.	Having the VA/VET Center Program’s Clinical Visit Count and Productivity Standards Reduced to an Acceptable Level with a Greater Emphasis on Quality Care and Counselor Well-Being.
  2.	Approving/Allocating Adequate Funding for the VET Center Program to Hire Enough Clinicians to Meet the Demand for Services and Decrease Excessive Caseloads.
  3.	Passing Tough Legislation to Protect and Support Whistleblowers, with Severe Consequences for those who retaliate against them.

  Your assistance and commitment in undertaking this important issue is greatly appreciated.

  Very Respectfully,
    ${firstName} ${lastName}`);
  return (
    <>
      <BodyField multiline={true} value={finalBody} styles={{ field: { height: 300, width: 500 } }} componentRef={bodyRef} />

      <ButtonContainer>
        <PrimaryButton onClick={onEmailClick}>Copy Form Letter ${"&"} Go To Website</PrimaryButton>
        <DefaultButton onClick={onDismissModal}>Close</DefaultButton>
      </ButtonContainer>
    </>)
}

const teachingPanesText: ITeachingPaneProps[] = [
  {
    text: (
    <span>
      Instructions:
      <ul>
        <li>An automated form letter will appear on next page.</li>
        <li>Select your Senator.</li>
        <li>Left Click on blue “Copy Form Letter &amp; Go To Website” button (this will copy letter to your clipboard/browser and direct you to Congress person’s website). </li>
        <li>Left Click on blue “OK” button.</li>      
        <li>Right Click/Paste letter into the message form on Congress person’s website.</li>
        <li>Fill out rest of the form, as directed.</li>
        <li>Left Click “Send/Submit.”</li>
        <li>Repeat this procedure for your U.S. House Representative.</li>
      </ul>
    </span>)
  }
]
const EmailModal = ({ firstName, lastName, onDismissModal, lookup }: { firstName: string, lastName: string, onDismissModal: () => void, lookup: ILookupRepresentative }) => {

  const senators = useFindSenator(lookup)
  const panes = useMemo(() => {
    return senators ? senators.map(senator => ({
      menuItem: `${senator.first_name} ${senator.last_name}`,
      render: () => (
        <Tab.Pane>
          <ModalContent firstName={firstName} lastName={lastName} senator={senator} onDismissModal={onDismissModal} />
        </Tab.Pane>)
    })) : []
  }, [senators])

  const [showTeachingPanes, setShowTeachingPanes] = useState(true);
  const dismissTeachingPanes = useCallback(() => {
    setShowTeachingPanes(false);
  }, [setShowTeachingPanes])
  return (
    <Modal onDismiss={onDismissModal} isOpen={true} styles={{
      main: {
        padding: 10,
        height: 550
      },
      scrollableContent: {
        height: '100%'
      }
    }}>
      {showTeachingPanes && <TeachingPanes panes={teachingPanesText} onDismiss={dismissTeachingPanes} />}
      {!!senators && !showTeachingPanes && <Tab panes={panes} />}
      {!senators && !showTeachingPanes && (
        <SpinnerContainer>
          <Spinner size={SpinnerSize.large} />
        </SpinnerContainer>
      )}
    </Modal >
  )
}

const ErrorMessage = styled.div`
  white-space: pre-line;
  font-weight: bold;
`;

const Form: FunctionComponent = () => {
  const [error, setError] = useState<{ message: string } | undefined>(undefined)
  const { TextField: FirstNameField, value: firstName } = useTextField();
  const { TextField: LastNameField, value: lastName } = useTextField();
  const { TextField: StreetAddressField, value: street } = useTextField();
  const { TextField: CityField, value: city } = useTextField();
  const { StatePicker, value: state, query } = useStatePicker();
  const { TextField: ZipCodeField, value: zip } = useTextField();
  const [showModal, setShowModal] = useState(false);
  const onShowModal = useCallback(() => {
    let error = "Error!"
    if (zip && state && firstName && lastName) {
      setShowModal(true)
      return
    }
    if (!zip) {
      error += "\nYou must enter your zip code."
    }
    if (!state) {
      error += "\nYou must enter your state of residence."
    }
    if (!firstName) {
      error += "\nYou must enter your first name."
    }
    if (!lastName) {
      error += "\nYou must enter your last name."
    }
    setError({ message: error })
  }, [setError, setShowModal, zip, state, firstName, lastName])
  const onDismissModal = useCallback(() => {
    setShowModal(false)
  }, [])
  const date = new Date();

  return (
    <>
      {showModal && <EmailModal firstName={firstName} lastName={lastName} onDismissModal={onDismissModal} lookup={{ zip, street, state: query, city, state_code: (state as any).data.Code }} />}
      <FormHeading>Congressional Form Letter</FormHeading>
      {error && (<ErrorMessage >{error.message}</ErrorMessage>)}
      <FormControlsContainer>
        <FirstNameField label="Your First Name"/>
        <LastNameField label="Your Last Name"/>
        {/* <StreetAddressField label="Your Street Address" />
        <CityField label="City" /> */}
        <StatePicker placeholder="Select a state" value={query} searchQuery={query} />
        <ZipCodeField label="Zip Code"/>
        <ButtonContainer>
          <PrimaryButton onClick={onShowModal}>Generate Email</PrimaryButton>
        </ButtonContainer>
      </FormControlsContainer>
    </>
  )
}

const RepLookup = ({ zip, street, state, city, state_code }: ILookupRepresentative) => {
  const rep = useFindRepresentative({ zip, street, city, state, state_code })
  return <Fragment />
}


const renderContent = () => {
  return (
    <Fabric>
      <PageContainer>
        <FormContainer>
          <Form />
        </FormContainer>
      </PageContainer>
    </Fabric>
  );
};

ReactDOM.render(renderContent(), document.getElementById('root') as HTMLElement);
