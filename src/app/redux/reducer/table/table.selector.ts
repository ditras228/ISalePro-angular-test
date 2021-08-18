import {createFeatureSelector, createSelector} from "@ngrx/store";
import {tableNode, TableState} from "./table.reducer";
import {iUser} from "../../../table/user";

export const selectTableFeature=createFeatureSelector<TableState>(tableNode)

export const selectUsers =createSelector(
    selectTableFeature,
  ()=>(state: TableState): iUser[]=>state.users
)
