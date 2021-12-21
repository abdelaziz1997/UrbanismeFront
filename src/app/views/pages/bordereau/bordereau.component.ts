import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../core/services/demande.service";
import {ModelService} from "../../../core/services/model.service";

@Component({
  selector: 'kt-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent implements OnInit {
	refDem: string;
  constructor(private _service: ModelService) { }

  ngOnInit() {
	  this.refDem = history.state.reference;
  }

	impRegistre5() {
		this._service.imprimerRegistre5('/ImprimerRegistre5/',this.refDem);
	}

	impRegistre6() {
		this._service.imprimerRegistre6('/ImprimerRegistre6/',this.refDem);
	}
}
