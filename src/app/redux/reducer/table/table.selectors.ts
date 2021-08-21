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
export const selectIsModal=createSelector(
  selectTableFeature,
  (state: TableState):boolean=>state.isModal
)
function matches(user:iUser, term: string) {
  const {firstName,lastName,email,phone,description,address}=user
  const termToLowerCase=term.toLowerCase()

  return firstName.toLowerCase().includes(termToLowerCase) ||
    lastName.toLowerCase().includes(termToLowerCase) ||
    email.toLowerCase().includes(termToLowerCase) ||
    phone.toLowerCase().includes(termToLowerCase) ||
    description.toLowerCase().includes(termToLowerCase) ||
    address.streetAddress?.toLowerCase().includes(termToLowerCase) ||
    address.city?.toLowerCase().includes(termToLowerCase) ||
    address.state?.toLowerCase().includes(termToLowerCase) ||
    address.zip?.toLowerCase().includes(termToLowerCase)
}

export function compare(a: any, b: any, sortDirection: string):number{
  if(a>b){
    return sortDirection==='asc'?1:-1
  }
  if(a<b){
    return sortDirection==='desc'?1:-1
  }
  return 0
}
