import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectUsers} from "../redux/reducer/table/table.selectors";
import {TableState} from "../redux/reducer/table/table.reducer";
import {iUser} from "./user";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  public users$:Observable<iUser[]>=this.store$.pipe(select(selectUsers))

  constructor(private store$: Store<TableState>) {
  }
  ngOnInit(): void {
  }

}
