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
export const selectPage=createSelector(
  selectTableFeature,
  (state: TableState):number=>state.page
)
export const selectPageSize=createSelector(
  selectTableFeature,
  (state: TableState):number=>state.pageSize
)
export const selectSortedData = createSelector(
  selectTableData,
  selectSortDirection,
  selectSortKey,
  selectPage,
  selectPageSize,
  (tableData, sortDirection, sortKey, page,pageSize) => {
    if (sortDirection === '') {
      return tableData;
    }
    const sortedData = [...tableData].sort((a, b) => {
      const paramA = a[sortKey];
      const paramB = b[sortKey];
      return compare(paramA, paramB, sortDirection);
    })          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    ;
    return sortedData;
  }
);



export const selectCollectionSize=createSelector(
  selectTableFeature,
  (state: TableState):number=>state.collectionSize
)
export const selectCurrentPage=createSelector(
  selectTableFeature,
  (state: TableState):number=>state.pageData
)
export function compare(a: any, b: any, sortDirection: string):number{
  if(a>b){
    return sortDirection==='asc'?1:-1
  }
  if(a<b){
    return sortDirection==='desc'?1:-1
  }
  return 0
}
