import {TableActions} from "./table.actions";
import {compare} from "./table.selectors";
import {iUser} from "../../../table/user";
import {PipeTransform} from "@angular/core";

export const tableNode = 'table'

export interface TableState {
  tableData: any,
  sortDirection: ''
  sortKey: ''
  pageSize:number
  collectionSize: number
  pageData:any
  page:number
  searchTerm:string
}

const initialState: TableState = {
  sortDirection: '',
  sortKey: '',
  tableData: [],
  pageSize: 3,
  collectionSize: 0,
  pageData:[],
  page: 1,
  searchTerm:''
}
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
    case TableActions.SET_SEARCH_TERM:{
      return {...state, searchTerm: action.payload}
    }
    case TableActions.SET_SORT_KEY: {
      const sortKey = action.payload
      let sortDirection;
      if (sortKey !== state.sortKey) {
        sortDirection = 'asc';
      } else {
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
