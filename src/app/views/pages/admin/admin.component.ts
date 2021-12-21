// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
import {LayoutConfigService, MenuConfigService} from '../../../core/_base/layout';
// Widgets model
import { SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
import {MenuConfig} from "../../../core/_config/demo3/menu.config";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoSys } from '../../../core/models/info-sys';
import { SystemService } from '../../../core/services/system.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './admin.component.html',
	styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {

	ParamFrom: FormGroup;
	SystemInfo: InfoSys;
	constructor(private router: Router, private _formBuilder: FormBuilder,public snackBar: MatSnackBar, private _service: SystemService) {
	}
	ngOnInit(): void {
		this.createParamForm();
	}

	public createParamForm() {
		this.ParamFrom = this._formBuilder.group({
			ville_fr: ['', Validators.required],
			ville_ar: ['', Validators.required],
			province_fr: ['', Validators.required],
			province_ar: ['', Validators.required],
			commune_fr: ['', Validators.required],
			commune_ar: ['', Validators.required]
		});
	}
	enregistrer() {
		// tslint:disable-next-line:max-line-length
		this.SystemInfo = new InfoSys();
		this.SystemInfo.ville_ar = this.ParamFrom.get('ville_ar').value;
		this.SystemInfo.ville_fr = this.ParamFrom.get('ville_fr').value;
		this.SystemInfo.province_ar = this.ParamFrom.get('province_ar').value;
		this.SystemInfo.province_fr = this.ParamFrom.get('province_fr').value;
		this.SystemInfo.commune_ar = this.ParamFrom.get('commune_ar').value;
		this.SystemInfo.commune_fr = this.ParamFrom.get('commune_fr').value;	

		this._service.saveSysInfo(this.SystemInfo)
			.subscribe(data => {
				this.snackBar.open('Le système a été paramétré', 'X', {
					duration: 3000,
				});
				this.router.navigate(['/admin']);
			}, err => {
				console.log(err);
			});
	}

	
}
