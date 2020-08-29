import { useMemo } from "react";
import BaseApi from "../components/Api/BaseApi";
import { ILookupRepresentative } from "./types";
const url = `https://cors-anywhere.herokuapp.com/ziplook.house.gov/htbin/findrep_house?ADDRLK86154111086154111`;
//method: POST
//Content-Type: application/x-www-form-urlencoded
/** Form Data
street: 2149 NW Shy Bear Way
city: Issaquah
state: WAWashington
Submit: FIND YOUR REP BY ADDRESS
ZIP: 98027
 */

export const useFindRepresentative = ({ zip, street, city, state }: ILookupRepresentative) => {
  return useMemo(() => {
    const data = new FormData();
    data.append('Zip', zip)
    data.append('street', street)
    data.append('city', city)
    data.append('state', state)
    data.append('Submit', 'FIND YOUR REP BY ADDRESS')
    //request the data
    BaseApi.request(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    }).then((resp) => {
      console.log(resp)
    })
  }, [
    zip,
    street,
    city,
    state
  ])
}