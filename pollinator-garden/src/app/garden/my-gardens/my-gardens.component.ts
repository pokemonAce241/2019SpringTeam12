import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-gardens',
  templateUrl: './my-gardens.component.html',
  styleUrls: ['./my-gardens.component.css'],
})
export class MyGardensComponent implements OnInit {

  @Input() name;

  constructor(public activeModal: NgbActiveModal) {
    
  }

  ngOnInit() {
  }

}
