export interface iDataTableState{
  tableData:any[]
  sortDirection:string
  sortKey: string
}
export interface iHeaderRowItem{
  displayName: string
  key: string
  hasSort: boolean
}
