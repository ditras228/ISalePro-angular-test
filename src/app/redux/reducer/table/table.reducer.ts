import {iUser} from "../../../table/user";
import {MetaReducer} from "@ngrx/store";

export const tableNode= 'table'
export interface TableState{
  users: iUser[]
}
const initialState: TableState={
  users: [
    {
      id: 101,
      firstName: 'Sue',
      lastName: 'Corson',
      email: 'DWhalley@in.gov',
      phone: '(612)211-6296',
      address: {
        streetAddress: '9792 Mattis Ct',
        city: 'Waukesha',
        state: 'WI',
        zip: '22178'
      },
      description: 'et lacus magna dolor...',
    }

  ]
}
export const tableReducer = (state = initialState, action: any)=>{
  switch (action){

  }
  return state
}
