import {createFeatureSelector, createSelector} from "@ngrx/store";
import {tableNode, TableState} from "./table.reducer";
import {iUser} from "../../../table/models/user.model";

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
export const selectSearchTerm=createSelector(
  selectTableFeature,
  (state: TableState):string=>state.searchTerm
)
export const selectCollectionSize=createSelector(
  selectTableFeature,
  (state: TableState):number=>state.collectionSize
)
export const selectCurrentPage=createSelector(
  selectTableFeature,
  (state: TableState):Array<any>=>state.pageData
)
export const selectCurrentUser=createSelector(
  selectTableFeature,
  (state: TableState):iUser=>state.currentUser
)
export const selectIsForm=createSelector(
  selectTableFeature,
  (state: TableState):boolean=>state.isForm
)
export const selectIsEmpty=createSelector(
  selectTableFeature,
  (state: TableState):boolean=>state.isEmpty
)
export const selectIsModal=createSelector(
  selectTableFeature,
  (state: TableState):boolean=>state.isModal
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
