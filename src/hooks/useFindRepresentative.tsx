import { useMemo, useState } from "react";
import BaseApi from "../components/Api/BaseApi";
import { ILookupRepresentative } from "./types";
const url = `https://replookup.azurewebsites.net/api/findrep?code=ngaaTr3Zy37oRPvQHeOIgfFEtKOrL6m1gQTmaUKSKIRqyaskHjixDA==`;
export interface IRepresentative {
  email: string;
  first_name: string;
  last_name: string;
}
export interface IRepResponse {
  representatives: IRepresentative[]
}

export const useFindRepresentative = ({ zip, street, city, state }: ILookupRepresentative) => {
  const [representatives, setReps] = useState<IRepresentative[] | undefined>()
  useMemo(() => {    
    const data = {
      zip,
      street,
      city,
      state,
    }
    //request the data
    BaseApi.request(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }).then((resp) => {
      setReps((resp.data as IRepResponse).representatives)
    })
  }, [
    zip,
    street,
    city,
    state
  ])
  return representatives
}