import {TableActions} from "./table.actions";
import {compare} from "./table.selectors";

export const tableNode = 'table'

export interface TableState {
  tableData: any,
  sortDirection: '',
  sortKey: ''
  pageSize:number
  collectionSize: number
  pageData:any,
  page:number
}

const initialState: TableState = {
  sortDirection: '',
  sortKey: '',
  tableData: [],
  pageSize: 3,
  collectionSize: 0,
  pageData:[],
  page: 1
}
export const tableReducer = (state = initialState, action: any) => {
  if (action.type === TableActions.SET_DATA_TABLE) {
    {
      const data = action.payload
      return {...state, tableData: data, collectionSize: data.length}
    }
  } else if (action.type === TableActions.SET_PAGE) {
    {
      const page = action.payload
      return {
        ...state, page, pageData: state.tableData
      }
    }
  } else if (action.type === TableActions.SET_SORT_KEY) {
    {
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
  } else if (action.type === TableActions.RESET_DB_STORE) {
    {
      return {...state, ...initialState}
    }
  } else {
    return state
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
