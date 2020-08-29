import { useMemo, useState } from "react";
import BaseApi from "../components/Api/BaseApi";
import { ILookupRepresentative } from "./types";
import { settings } from "../settings";
const url = `${settings.api}/findSenator`;
//method: POST
//Content-Type: application/x-www-form-urlencoded
/** Form Data
street: 2149 NW Shy Bear Way
city: Issaquah
state: WAWashington
Submit: FIND YOUR REP BY ADDRESS
ZIP: 98027
 */

export interface ISenatorMember {
  address: string;
  email: string;
  first_name: string;
  last_name: string;
}
export interface ISenatorResponse {
  senators: { member: ISenatorMember }[]
}


export const useFindSenator = ({ zip, street, city, state, state_code }: ILookupRepresentative) => {
  const [senators, setSenators] = useState<ISenatorMember[] | undefined>()
  useMemo(() => {
    const data = {
      zip,
      street,
      city,
      state,
      state_code
    }
    //request the data
    BaseApi.request(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }).then((resp) => {
      setSenators((resp.data as ISenatorResponse).senators.map(senator => senator.member))
    })
  }, [zip, street, city, state, state_code])
  return senators
}