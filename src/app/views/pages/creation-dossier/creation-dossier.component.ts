import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {Demande} from '../../../core/models/demande';
import {ModelService} from '../../../core/services/model.service';
import {CreationDossierForm} from '../../../core/forms/creation-dossier-form';
import {MatSnackBar} from '@angular/material';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {DemandeService} from "../../../core/services/demande.service";
import {LayoutUtilsService, MessageType} from "../../../core/_base/crud";


@Component({
	selector: 'kt-creation-dossier',
	templateUrl: './creation-dossier.component.html',
	styleUrls: ['./creation-dossier.component.scss']
})
export class CreationDossierComponent implements OnInit,OnDestroy {
	loading = false;
	today: number = Date.now();
	statut: string = 'Brouillon';
	plan: string = 'xxxxxx';
	LastdemandeId: any;
	reference: string;
	hasFormErrors: boolean = false;
	date: Date;
	newdate: string;
	creationDossierForm: CreationDossierForm;
	demandeurFrom: FormGroup;
	maxId: number;
	dtDemande: any;
	constructor(private router: Router, private service: DemandeService, private _formBuilder: FormBuilder,
				public snackBar: MatSnackBar, private _scrollToService: ScrollToService, private layoutUtilsService: LayoutUtilsService) { }

	ngOnInit() {
		this.createDemandeurForm();
		this.loading = false;
		this.service.getDemandeLastID()
			.subscribe(data => {
				this.LastdemandeId = data;
				console.log(this.LastdemandeId);
				this.reference = this.generateReference(this.LastdemandeId + 1);
			}, err => {
				console.log(err);
			});
		this.date = new Date(this.today);
	}
	ngOnDestroy(): void {
		this.loading = false;
	}

	public createDemandeurForm() {
		this.demandeurFrom = this._formBuilder.group({
			nomDemandeur_fr: ['', Validators.required],
			nomDemandeur_ar: ['', Validators.required],
			preDemandeur_fr: ['', Validators.required],
			preDemandeur_ar: ['', Validators.required],
			qualite_fr: ['', Validators.required],
			qualite_ar: ['', Validators.required]
		});
	}
	enregistrer() {
		if (this.showErrorAlert()) { return; }
		// tslint:disable-next-line:max-line-length
		this.creationDossierForm = new CreationDossierForm(this.demandeurFrom.get('nomDemandeur_ar').value,this.demandeurFrom.get('nomDemandeur_fr').value,this.demandeurFrom.get('preDemandeur_ar').value,this.demandeurFrom.get('preDemandeur_fr').value,
			this.demandeurFrom.get('qualite_ar').value,this.demandeurFrom.get('qualite_fr').value,this.reference,this.date,this.statut,this.plan);

		this.service.saveDemandeurDemande(this.creationDossierForm)
			.subscribe(data => {
				this.snackBar.open('Dossier a été créer avec succès', 'X', {
					duration: 3000,
				});
				this.router.navigate(['/listeDossiers']);
			}, err => {
				console.log(err);
			});
	}
	continuer() {
		if (this.showErrorAlert()) { return; }
		// tslint:disable-next-line:max-line-length
		this.creationDossierForm = new CreationDossierForm(this.demandeurFrom.get('nomDemandeur_ar').value,this.demandeurFrom.get('nomDemandeur_fr').value,this.demandeurFrom.get('preDemandeur_ar').value,this.demandeurFrom.get('preDemandeur_fr').value,
			this.demandeurFrom.get('qualite_ar').value,this.demandeurFrom.get('qualite_fr').value,this.reference,this.date,this.statut,this.plan);

		this.service.saveDemandeurDemande(this.creationDossierForm)
			.subscribe(data => {
				const _addMessage = 'Demande est ajoutée avec succée';
				this.layoutUtilsService.showActionNotification(_addMessage, MessageType.Create);
			}, err => {
				console.log(err);
			});
		// tslint:disable-next-line:max-line-length
		this.router.navigate(['/depot'],{state: {reference: this.reference,date: this.date, id: this.LastdemandeId,nomDem: this.demandeurFrom.get('nomDemandeur_fr').value,preDem: this.demandeurFrom.get('preDemandeur_fr').value, statut: this.statut}});
	}

	private generateReference(id) {
		// console.log('LISM' + new Date(this.today).toLocaleDateString().replace(/-|\//g,'') + id.toString());
		return 'LISM' + new Date(this.today).toLocaleDateString().replace(/-|\//g,'') + id.toString();
	}
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	private showErrorAlert() {
		this.hasFormErrors = false;
		const controls = this.demandeurFrom.controls;
		/** check form */
		if (this.demandeurFrom.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			const config: ScrollToConfigOptions = {
				target: 'ErrorCase'
			};

			this._scrollToService.scrollTo(config);
			this.hasFormErrors = true;
			return true;
		}
	}
}
