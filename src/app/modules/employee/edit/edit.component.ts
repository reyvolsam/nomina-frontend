import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employee_id: Number = null

  constructor(
    private route: ActivatedRoute
    ) {
      this.employee_id = parseInt(this.route.snapshot.paramMap.get('id'))
    }

  ngOnInit() {
  }

}
