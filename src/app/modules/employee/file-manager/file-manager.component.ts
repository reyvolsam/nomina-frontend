import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { SharedServices } from '../../../services/shared-services/shared-services.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  @Input() fieldName = '';

  @Output()
  listNew = new EventEmitter<any>();

  @Output()
  listCurrentFiles = new EventEmitter<any>();

  @Input() listCurrent = [];

  listNewFile = [];

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
  }

  async onFileSelectNew(eve) {
    // console.log('print', eve.files[0])

    let fileSelected = eve.files[0];

    let objNewFiles = {
      file_name: '',
      file_base: ''
    }

    if (fileSelected) {
      await this.sharedServices.toBase64(fileSelected).then((res: any) => {
        if (res) {
          // console.log(res)
          let base = res.split(',');
          objNewFiles.file_base = base[1];
          objNewFiles.file_name = fileSelected.name;
        }
        // objSend.administrative_files_new.push(objNewFiles);
      })

    }

    this.listNewFile.push(objNewFiles);
    console.log('list emmit', this.listNewFile)
    this.listNew.emit(this.listNewFile);

  }

  deleteFileNew(i) {
    this.listNewFile.splice(i, 1);
    this.listNew.emit(this.listNewFile);


  }

  deleteFileCurrent(i: number) {
    this.listCurrent[i].delete_file = true;
    this.listCurrentFiles.emit(this.listCurrent);

  }



}
