import { Component, OnInit } from '@angular/core';
import {ModelService} from "../../../core/services/model.service";

@Component({
  selector: 'kt-registres',
  templateUrl: './registres.component.html',
  styleUrls: ['./registres.component.scss']
})
export class RegistresComponent implements OnInit {
 date: string = '2019';
  constructor(private _service: ModelService) { }

  ngOnInit() {
  }

	impRegistre1() {
		this._service.imprimerRegistre1('/ImprimerRegistre1/',this.date);
	}

	impRegistre2() {
		this._service.imprimerRegistre2('/ImprimerRegistre2/',this.date);
	}

	impRegistre3() {
		this._service.imprimerRegistre3('/ImprimerRegistre3/',this.date);
	}

	impRegistre4() {
		this._service.imprimerRegistre4('/ImprimerRegistre4/',this.date);
	}
}
