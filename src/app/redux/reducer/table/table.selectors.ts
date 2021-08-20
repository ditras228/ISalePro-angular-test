import {createFeatureSelector, createSelector} from "@ngrx/store";
import {tableNode, TableState} from "./table.reducer";

export const selectTableFeature=createFeatureSelector<TableState>(tableNode)

export const selectSortDirection =createSelector(
    selectTableFeature,
    (state: TableState): string=>state.sortDirection
)

export const selectSortKey =createSelector(
  selectTableFeature,
  (state: TableState): string=>state.sortKey
)

export const selectTableData =createSelector(
  selectTableFeature,
  (state: TableState):any=>state.tableData
)

export const selectSortedData = createSelector(
  selectTableData,
  selectSortDirection,
  selectSortKey,
  (tableData, sortDirection, sortKey) => {
    if (sortDirection === '') {
      return tableData;
    }
    const sortedData = [...tableData].sort((a, b) => {
      const paramA = a[sortKey];
      const paramB = b[sortKey];
      return compare(paramA, paramB, sortDirection);
    });
    return sortedData;
  }
);

export function compare(a: any, b: any, sortDirection: string):number{
  if(a>b){
    return sortDirection==='asc'?1:-1
  }
  if(a<b){
    return sortDirection==='desc'?1:-1
  }
  return 0
}
