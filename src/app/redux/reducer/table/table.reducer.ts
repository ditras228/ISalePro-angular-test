import {TableActions} from "./table.actions";

export const tableNode = 'table'

export interface TableState {
  tableData: any,
  sortDirection: '',
  sortKey: ''
}

const initialState: TableState = {
  sortDirection: '',
  sortKey: '',
  tableData: []
}
export const tableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TableActions.SET_DATA_TABLE: {
      return {...state, tableData:  action.payload}
    }
    case TableActions.SET_SORT_KEY: {
      const sortKey= action.payload
      let sortDirection;
      if (sortKey  !== state.sortKey) {
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
    default:
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
