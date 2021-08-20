import {tableNode, tableReducer, TableState} from "./table/table.reducer";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../../environments/environment";

export interface State{
  [tableNode]: any
}

export const reducers: ActionReducerMap<State>={
  [tableNode]:  tableReducer
}
export const metaReducers: MetaReducer<State>[]=!environment.production?[]:[]

