import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectUsers} from "../redux/reducer/table/table.selector";
import {TableState} from "../redux/reducer/table/table.reducer";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  public users$:Observable<any>=this.store$.pipe(select(selectUsers))

  constructor(private store$: Store<TableState>) {
  }

  ngOnInit(): void {

  }

}
