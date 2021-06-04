import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-download-files',
  templateUrl: './table-download-files.component.html',
  styleUrls: ['./table-download-files.component.css']
})
export class TableDownloadFilesComponent implements OnInit {

  @Input() title: string = null;
  @Input() arrayFiles = null;

  @Input() file = null;
  @Input() fileName: string = null;
  @Input() fileRoute: string = null;

  constructor() { }

  ngOnInit() {
  }

}
