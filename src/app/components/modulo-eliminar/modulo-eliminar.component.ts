import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modulo-eliminar',
  templateUrl: './modulo-eliminar.component.html',
  styleUrls: ['./modulo-eliminar.component.css']
})
export class ModuloEliminarComponent implements OnInit {

  @Input() name;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
