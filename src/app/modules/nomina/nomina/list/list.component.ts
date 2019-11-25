import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
  }

  ngOnInit() {
  }

  open()
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    //modalRef.componentInstance.formData = this.user
    //modalRef.result.then(result => result ? this.gerUsersList(this.page) : false)
  }

}////
