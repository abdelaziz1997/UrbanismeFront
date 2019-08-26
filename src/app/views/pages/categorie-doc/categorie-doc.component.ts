import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-categorie-doc',
  templateUrl: './categorie-doc.component.html',
  styleUrls: ['./categorie-doc.component.scss']
})
export class CategorieDocComponent implements OnInit {
	@Input() pdfSrc;
	//pdfSrc: string = './assets/media/doc.pdf';
	@Input() Title;
	constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
