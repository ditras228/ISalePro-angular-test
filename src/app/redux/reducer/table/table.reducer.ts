import {TableActions} from "./table.actions";
import {iUser} from "../../../table/models/user.model";
export const tableNode = 'table'

const initialState: TableState = {
  tableData: [],
  pageData: [],

  sortDirection: '',
  sortKey: '',

  pageSize: 3,
  collectionSize: 0,
  page: 1,

  searchTerm: '',

  currentUser: {} as iUser,

  isModal: false,
  isForm: false
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
      const page = action.payload
      return {
        ...state, page, pageData: state.tableData
      }
    }

    case TableActions.SET_SEARCH_TERM: {
      return {...state, searchTerm: action.payload}
    }

    case TableActions.CREATE_NEW_USER: {
      return {...state, tableData: [...state.tableData, action.payload]}
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
}
