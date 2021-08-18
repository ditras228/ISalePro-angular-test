import {iUser} from "../../../table/user";

export const tableNode= 'table'

export interface TableState{
  users: iUser[]
}

const initialState: TableState={
  users: [
    {
      id: 1,
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
    },
    {
      id: 2,
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
  switch (action.type){
    default:  return state
  }
}
