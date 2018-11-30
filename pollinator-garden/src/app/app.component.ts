import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MyGardensComponent } from 'src/app/garden/my-gardens/my-gardens.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyGardensComponent, NgbActiveModal],
})
export class AppComponent {
  title = 'pollinator-garden';
  constructor(private modalService: NgbModal,) {
  }

  openModal() {
    const modalRef = this.modalService.open(MyGardensComponent, { windowClass: 'dialog-modal content-modal' });
    modalRef.componentInstance.name = 'World';
  }
}
