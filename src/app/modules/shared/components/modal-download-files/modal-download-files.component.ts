import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-download-files',
  templateUrl: './modal-download-files.component.html',
  styleUrls: ['./modal-download-files.component.css']
})
export class ModalDownloadFilesComponent implements OnInit {

  @Input() nominaDispersion = null;

  @Input() paymentTransference1 = null;
  @Input() paymentTransference2 = null;
  @Input() xmlPayment = null;

  
  @Input() imss = null; 
  @Input() infonavit = null; 
  @Input() impuesto = null; 
  @Input() pagoImss = null; 
  @Input() pagoImpuesto = null;

  @Input() cfdiNomina = null;

  @Input() arrBackup = null;
  @Input() arrAmount = null;
  @Input() arrMonthly = null;



  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log('nomina_dispersion', this.nominaDispersion)
  }

  close(){
    this.activeModal.close();
  }

}
