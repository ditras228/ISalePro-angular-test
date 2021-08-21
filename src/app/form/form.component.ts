import {Component, OnInit} from '@angular/core';
import {iUser} from "../table/models/user.model";
import {Store} from "@ngrx/store";
import {iDataTableState} from "../table/models/data-table.model";
import {TableActions} from "../redux/reducer/table/table.actions";
import {API} from "../API";
import * as dataTableSelectors from "../redux/reducer/table/table.selectors";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  constructor(private store: Store<iDataTableState>) {
  }

  public user!: iUser
  public tableData$!: Observable<any>
  public isForm$!: Observable<any>
  public userForm!:FormGroup
  tableData = []

  ngOnInit(): void {
    this.user = {address: {}} as iUser
    this.tableData$ = this.store.select(dataTableSelectors.selectTableData);
    this.tableData$.subscribe(event => this.tableData = event)
    this.isForm$ =  this.store.select(dataTableSelectors.selectIsForm);
   // this.userForm=new FormControl({
   // })
  }

  public submitFormHandler() {
    this.store.dispatch({type: TableActions.CREATE_NEW_USER, payload: this.user})
    console.log(this.tableData)
    API.save(this.tableData)
  }

}
