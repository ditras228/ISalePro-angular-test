import {Component, OnInit} from '@angular/core';
import {iUser} from "../table/models/user.model";
import {Store} from "@ngrx/store";
import {iDataTableState} from "../table/models/data-table.model";
import {TableActions} from "../redux/reducer/table/table.actions";
import {API} from "../API";
import * as dataTableSelectors from "../redux/reducer/table/table.selectors";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
    this.userForm=new FormGroup({
      'id': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'zip': new FormControl(null, Validators.required),
      'streetAddress': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      'description': new FormControl(null),
    })
  }
  public submitFormHandler() {
    this.store.dispatch({type: TableActions.CREATE_NEW_USER, payload: this.userForm.value})
    API.save(this.tableData)
  }

  // GETTERS

  get id(){
    return this.userForm.get('id')
  }
  get firstName(){
    return this.userForm.get('firstName')
  }
  get lastName(){
    return this.userForm.get('lastName')
  }
  get email(){
    return this.userForm.get('email')
  }
  get phone(){
    return this.userForm.get('phone')
  }
  get zip(){
    return this.userForm.get('zip')
  }
  get streetAddress(){
    return this.userForm.get('streetAddress')
  }
  get city(){
    return this.userForm.get('city')
  }
  get state(){
    return this.userForm.get('state')
  }
  get description(){
    return this.userForm.get('description')
  }
}
