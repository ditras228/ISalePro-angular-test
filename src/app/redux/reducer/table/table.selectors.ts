import {createFeatureSelector, createSelector} from "@ngrx/store";
import {tableNode, TableState} from "./table.reducer";
import {iUser} from "../../../table/user";

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
export const selectSortedData = createSelector(
  selectTableData,
  selectSortDirection,
  selectSortKey,
  selectPage,
  selectPageSize,
  selectSearchTerm,
  (tableData, sortDirection, sortKey, page,pageSize,searchTerm) => {
    if (sortDirection === '') {
      return tableData
        .filter((user:any)=>matches(user, searchTerm))
        .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }
    const sortedData = [...tableData]
      .sort((a, b) => {
      const paramA = a[sortKey];
      const paramB = b[sortKey];
      return compare(paramA, paramB, sortDirection);
    })
      .filter(user=>matches(user, searchTerm))
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    return sortedData;
  }
);
function matches(user:iUser, term: string) {
  return user.firstName.toLowerCase().includes(term.toLowerCase()) ||
         user.lastName.toLowerCase().includes(term.toLowerCase()) ||
         user.email.toLowerCase().includes(term.toLowerCase()) ||
         user.phone.toLowerCase().includes(term.toLowerCase()) ||
         user.description.toLowerCase().includes(term.toLowerCase()) ||
         user.description.toLowerCase().includes(term.toLowerCase()) ||
         user.address.streetAddress?.toLowerCase().includes(term.toLowerCase()) ||
         user.address.city?.toLowerCase().includes(term.toLowerCase()) ||
         user.address.state?.toLowerCase().includes(term.toLowerCase()) ||
         user.address.zip?.toLowerCase().includes(term.toLowerCase())
}

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
