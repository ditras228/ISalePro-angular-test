import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {metaReducers, reducers,} from "./redux/reducer";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks:{
        strictStateImmutability:true,
        strictActionImmutability:true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
