import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {iDataTableState} from "../table/models/data-table.model";
import {TableActions} from "../redux/reducer/table/table.actions";
import {Observable} from "rxjs";
import {iUser} from "../table/models/user.model";
import * as dataTableSelectors from "../redux/reducer/table/table.selectors";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  closeResult = '';

  public currentUser$!:Observable<iUser>


  constructor(private modalService: NgbModal, private store: Store<iDataTableState>) {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.currentUser$ =  this.store.select(dataTableSelectors.selectCurrentUser);
  }

}
