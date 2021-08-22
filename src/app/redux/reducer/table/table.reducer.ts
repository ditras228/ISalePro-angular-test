import {TableActions} from "./table.actions";
import {iUser} from "../../../table/models/user.model";
import {compare} from "./table.selectors";
export const tableNode = 'table'

const initialState: TableState = {
  tableData: [],
  pageData: [],

  sortDirection: '',
  sortKey: '',

  pageSize: 10,
  collectionSize: 0,
  page: 1,

  searchTerm: '',

  currentUser: {} as iUser,

  isModal: false,
  isForm: false,
  isEmpty: true
}

/*
  Момент с созданием редьюсера интересует больше всего - сделал традиционно свитчкейсом,
  потому что, по моему мнению, он самый производительный.
  Я знаю о существовании вшитых в ngRx методах и если свитч тут не к месту - поправьте меня)
*/

export const tableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TableActions.SET_DATA_TABLE: {
      const data = action.payload
      return {...state, tableData: data, collectionSize: data.length}
    }

    case TableActions.SET_PAGE: {
      const {sortDirection, tableData,pageSize,sortKey} = state
      let page= state.page
      let searchTerm= state.searchTerm

      if(typeof(action.payload)=='string' ){
        searchTerm=action.payload
        console.log(typeof(action.payload))
      }else{
        page=action.payload || 1
      }

      if (sortDirection === '') {
        return {...state,page,searchTerm, pageData: tableData
          .filter((user:any)=>matches(user, searchTerm))
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)};
      }
      const sortedData = [...tableData]
        .sort((a, b) => {
          const paramA = a[sortKey];
          const paramB = b[sortKey];
          return compare(paramA, paramB, sortDirection);
        })
        .filter(user=>matches(user, searchTerm))
        .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
      return {
        ...state,searchTerm, pageData: sortedData, page
      }
    }

    case TableActions.CREATE_NEW_USER: {
      const payload=action.payload
      const newUser= {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        address: {
          streetAddress: payload.streetAddress,
          city: payload.city,
          state: payload.state,
          zip: payload.zip,
        },
        description: payload.description,
      }
      return {...state, collectionSize: state.tableData.length+1, tableData: [newUser,...state.tableData]}
    }

    case TableActions.SET_SORT_KEY: {
      const sortKey = action.payload

      let sortDirection;

      if (sortKey !== state.sortKey) {
        sortDirection = 'asc';
      }
      else {
        sortDirection = setSortDirection(state.sortDirection);
      }
      return {
        ...state,
        sortKey,
        sortDirection
      }

    }

    case TableActions.RESET_DB_STORE: {
      return {...state, ...initialState}
    }

    case TableActions.SET_CURRENT_USER: {
      return {...state, currentUser: action.payload, isModal: true}
    }

    case TableActions.IS_FORM: {
      return {...state, isForm: !state.isForm}
    }

    case TableActions.IS_EMPTY:{
      return {...state, isEmpty: action.payload}
    }
    default: {
      return state
    }
  }
}

export function setSortDirection(sortDirection: string): string {
  switch (sortDirection) {
    case 'asc':
      return 'desc';
    case 'desc':
      return '';
    case '':
      return 'asc';
    default:
      return '';
  }
}

function matches(user:iUser, term: string) {
  return user.firstName.toLowerCase().includes(term.toLowerCase()) ||
    user.lastName.toLowerCase().includes(term.toLowerCase()) ||
    user.email.toLowerCase().includes(term.toLowerCase()) ||
    user.phone.toString().includes(term.toLowerCase()) ||
    user.description?.toLowerCase().includes(term.toLowerCase()) ||
    user.address.streetAddress?.toLowerCase().includes(term.toLowerCase()) ||
    user.address.city?.toLowerCase().includes(term.toLowerCase()) ||
    user.address.state?.toLowerCase().includes(term.toLowerCase()) ||
    user.address.zip?.toLowerCase().includes(term.toLowerCase())
}


export interface TableState {
  tableData: Array<any>,
  pageData: Array<any>

  sortDirection: ''
  sortKey: ''

  pageSize: number
  collectionSize: number
  page: number

  searchTerm: string

  currentUser: iUser

  isModal: boolean
  isForm: boolean
  isEmpty: boolean
}
