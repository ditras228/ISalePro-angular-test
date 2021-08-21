import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
// NgRx
import { Store } from '@ngrx/store';
import {TableActions} from '../redux/reducer/table/table.actions';
import * as dataTableSelectors from '../redux/reducer/table/table.selectors';
import {iDataTableState, iHeaderRowItem} from "./data-table.model";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 // @Input() data!: any[];
  //@Input() headerRow!: iHeaderRowItem[];

  headerRow : iHeaderRowItem[]= [
    { displayName: 'ID', key: 'id', hasSort: true    },
    { displayName: 'firstName', key: 'firstName', hasSort: true },
    { displayName: 'lastName', key: 'lastName', hasSort: true },
    { displayName: 'email', key: 'email', hasSort: true },
    { displayName: 'phone', key: 'phone', hasSort: true },
    { displayName: 'address', key: 'address', hasSort: false },
    { displayName: 'description', key: 'description', hasSort: true },
  ];

  public sortDirection$!: Observable<string>;
  public sortKey$!: Observable<string>;
  public tableData$!: Observable<any>;

  public page$!: Observable<number>;
  public pageSize$!: Observable<number>;
  public collectionSize$!: Observable<number>;
  public currentPage$!: Observable<any>;

  constructor(private store: Store<iDataTableState>) {}

  ngOnInit(): void {
    // DISPATCH
    this.store.dispatch({type: TableActions.SET_DATA_TABLE, payload: [
        {
          id: 101,
          firstName: 'sduse',
          lastName: 'dsda',
          email: 'DWhalley@in.gov',
          phone: '(612)211-d6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Waukesha',
            state: 'WI',
            zip: '22178'
          },
          description: 'et lacus mdagna dolor...',
        },
        {
          id: 102,
          firstName: 'ddue',
          lastName: 'Corson',
          email: 'DWhalley@in.gov',
          phone: '(612)211-6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Wauksesha',
            state: 'WId',
            zip: '2217s8'
          },
          description: 'et lacus magna dolor...',
        }, {
          id: 102,
          firstName: 'ddue',
          lastName: 'Corson',
          email: 'DWhalley@in.gov',
          phone: '(612)211-6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Wauksesha',
            state: 'WId',
            zip: '2217s8'
          },
          description: 'et lacus magna dolor...',
        }, {
          id: 102,
          firstName: 'ddue',
          lastName: 'Corson',
          email: 'DWhalley@in.gov',
          phone: '(612)211-6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Wauksesha',
            state: 'WId',
            zip: '2217s8'
          },
          description: 'et lacus magna dolor...',
        }, {
          id: 102,
          firstName: 'ddue',
          lastName: 'Corson',
          email: 'DWhalley@in.gov',
          phone: '(612)211-6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Wauksesha',
            state: 'WId',
            zip: '2217s8'
          },
          description: 'et lacus magna dolor...',
        }, {
          id: 102,
          firstName: 'ddue',
          lastName: 'Corson',
          email: 'DWhalley@in.gov',
          phone: '(612)211-6296',
          address: {
            streetAddress : '9792 Mattis Ct',
            city: 'Wauksesha',
            state: 'WId',
            zip: '2217s8'
          },
          description: 'et lacus magna dolor...',
        },
        ]
  });

    // SELECTORS
    this.tableData$ = this.store.select(dataTableSelectors.selectSortedData);
    this.sortKey$ = this.store.select(dataTableSelectors.selectSortKey);
    this.sortDirection$ = this.store.select(dataTableSelectors.selectSortDirection);

    this.page$ = this.store.select(dataTableSelectors.selectPage);
    this.pageSize$ = this.store.select(dataTableSelectors.selectPageSize);
    this.collectionSize$ = this.store.select(dataTableSelectors.selectCollectionSize);
    this.currentPage$ = this.store.select(dataTableSelectors.selectCurrentPage);
  }

  ngOnDestroy(): void {
    this.store.dispatch({type: TableActions.RESET_DB_STORE});
  }
  refreshData(payload:any){
    this.store.dispatch({type: TableActions.SET_PAGE, payload})
  }
  public onSort(headerItem: iHeaderRowItem): void {
    if (!headerItem.hasSort) {
      return;
    }
    const sortKey = headerItem.key;
    this.store.dispatch({type: TableActions.SET_SORT_KEY, payload: sortKey })
}
}
