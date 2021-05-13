import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedServices } from '../../../services/shared-services/shared-services.service';
import { NewFile, CurrentFile } from '../../../models/OneFileManagerModel';

@Component({
  selector: 'app-one-file-manager',
  templateUrl: './one-file-manager.component.html',
  styleUrls: ['./one-file-manager.component.css']
})
export class OneFileManagerComponent implements OnInit {

  @Input() fieldName = '';
  @Input() type = '';

  @Output()
  fileNew = new EventEmitter<NewFile>();

  @Output()
  currentFile = new EventEmitter<CurrentFile>();

  @Input() fileCurrent;

  newFile: File = null;

  resCurrent: CurrentFile;
  resp = {
    fileType: null,
    fileDelete: true
  };

  resNew: NewFile;
  respNew = {
    fileType: null,
    file: null
  };

  constructor(
  ) {
    this.resCurrent = this.resp;
    this.resNew = this.respNew;
   }

  ngOnInit() {
    // this.resCurrent.fileType = null;
    // this.resCurrent.fileDelete = null;

    console.log(this.type)
  }

  onFileSelectNew(eve) {
    console.log('file New', eve.files[0])
    this.newFile = eve.files[0];
    this.resNew.file = eve.files[0];
    this.resNew.fileType = this.type;
    this.fileNew.emit(this.resNew);
    

  }

  deleteFileNew() {
    this.newFile = null;
    this.resNew.file = null;
    this.resNew.fileType = this.type;
    // this.newFile = null;
    this.fileNew.emit(this.resNew);
    


  }

  deleteFileCurrent() {
    // this.fileCurrent.file_url = null;
    this.fileCurrent.file_delete = true;
    // let resp = {
    //   fileType: this.type,
    //   fileDelete: true
    // };

    // this.resCurrent = resp
    console.log(this.type)
    this.resCurrent.fileType = this.type;
    this.resCurrent.fileDelete = true;
    this.currentFile.emit(this.resCurrent);
  }

  retry(){
    this.fileCurrent.file_delete = false;
    this.resCurrent.fileType = this.type;
    this.resCurrent.fileDelete = false;
    this.currentFile.emit(this.resCurrent);

    // 
    this.deleteFileNew()
  }

}
