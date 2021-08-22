import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {TableActions} from '../redux/reducer/table/table.actions';
import * as dataTableSelectors from '../redux/reducer/table/table.selectors';
import {iDataTableState, iHeaderRowItem} from "./models/data-table.model";
import {iUser} from "./models/user.model";
import {API} from "../API";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  constructor(private modalService: NgbModal,private store: Store<iDataTableState>) {
  }

  headerRow: iHeaderRowItem[] = [
    {displayName: 'id', key: 'id', hasSort: true},
    {displayName: 'firstName', key: 'firstName', hasSort: true},
    {displayName: 'lastName', key: 'lastName', hasSort: true},
    {displayName: 'email', key: 'email', hasSort: true},
    {displayName: 'phone', key: 'phone', hasSort: true},
  ];

  public sortDirection$!: Observable<string>;
  public sortKey$!: Observable<string>;
  public tableData$!: Observable<any>;

  public page$!: Observable<number>;
  public pageSize$!: Observable<number>;
  public collectionSize$!: Observable<number>;

  public isForm$!: Observable<any>;
  public isEmpty$!:Observable<boolean>

  public currentUser$!:Observable<iUser>

  searchTerm = ''



  ngOnInit(): void {
    const response = JSON.parse(API.load() || '[]')

    // DISPATCH

    this.store.dispatch({
      type: TableActions.SET_DATA_TABLE, payload: response || []
    });
    this.store.dispatch({type: TableActions.SET_PAGE})

    // SELECTORS

    this.tableData$ = this.store.select(dataTableSelectors.selectCurrentPage);
    this.sortKey$ = this.store.select(dataTableSelectors.selectSortKey);
    this.sortDirection$ = this.store.select(dataTableSelectors.selectSortDirection);
    this.page$ = this.store.select(dataTableSelectors.selectPage);
    this.pageSize$ = this.store.select(dataTableSelectors.selectPageSize);
    this.collectionSize$ = this.store.select(dataTableSelectors.selectCollectionSize);
    this.isForm$ = this.store.select(dataTableSelectors.selectIsForm);
    this.isEmpty$ = this.store.select(dataTableSelectors.selectIsEmpty);
    this.currentUser$ =  this.store.select(dataTableSelectors.selectCurrentUser);

    this.collectionSize$.subscribe(num =>{
      this.store.dispatch({type: TableActions.IS_EMPTY, payload: !(num > 0)})
    } )

  }

  // FUNCTIONS
  addUserHandler(){
    this.store.dispatch({type: TableActions.IS_FORM})
  }
  open(content:any, payload: iUser) {
    this.modalService.open(content)
    this.store.dispatch({type: TableActions.SET_CURRENT_USER, payload})
  }


  refreshData(payload: any) {
    this.store.dispatch({type: TableActions.SET_PAGE, payload: payload})
  }


  searchTermHandler() {
    this.store.dispatch({type: TableActions.SET_PAGE, payload: this.searchTerm})

  }

  onSort(headerItem: iHeaderRowItem): void {
    if (!headerItem.hasSort) {
      return;
    }
    const sortKey = headerItem.key;
    this.store.dispatch({type: TableActions.SET_SORT_KEY, payload: sortKey})
    this.store.dispatch({type: TableActions.SET_PAGE})
  }

  ngOnDestroy(): void {
    this.store.dispatch({type: TableActions.RESET_DB_STORE});
  }
}
