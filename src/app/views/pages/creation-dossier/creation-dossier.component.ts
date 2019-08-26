import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {Demande} from '../../../core/models/demande';
import {ModelService} from '../../../core/services/model.service';
import {CreationDossierForm} from '../../../core/forms/creation-dossier-form';


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
	date: Date;
	newdate: string;
	creationDossierForm: CreationDossierForm;
	demandeurFrom: FormGroup;
	maxId: number;
	dtDemande: any;
  constructor(private router: Router, private service: ModelService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
	  this.demandeurFrom = this._formBuilder.group({
		  nomDemandeur_fr: ['', Validators.required],
		  nomDemandeur_ar: ['', Validators.required],
		  preDemandeur_fr: ['', Validators.required],
		  preDemandeur_ar: ['', Validators.required],
		  qualite_fr: ['', Validators.required],
		  qualite_ar: ['', Validators.required]
	  });
  	this.loading = false;
  	this.service.getRessources('/demande/maxId')
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
	enregistrer() {
		// tslint:disable-next-line:max-line-length
		this.creationDossierForm = new CreationDossierForm(this.demandeurFrom.get('nomDemandeur_ar').value,this.demandeurFrom.get('nomDemandeur_fr').value,this.demandeurFrom.get('preDemandeur_ar').value,this.demandeurFrom.get('preDemandeur_fr').value,
			this.demandeurFrom.get('qualite_ar').value,this.demandeurFrom.get('qualite_fr').value,this.reference,this.date,this.statut,this.plan);

		this.service.createRessources('/demandeur/saveDemandeur', this.creationDossierForm)
			.subscribe(data => {
				alert('Demande est ajoutée avec succée');
			}, err => {
				console.log(err);
			});
	}

	continuer() {
		// tslint:disable-next-line:max-line-length
		this.creationDossierForm = new CreationDossierForm(this.demandeurFrom.get('nomDemandeur_ar').value,this.demandeurFrom.get('nomDemandeur_fr').value,this.demandeurFrom.get('preDemandeur_ar').value,this.demandeurFrom.get('preDemandeur_fr').value,
			this.demandeurFrom.get('qualite_ar').value,this.demandeurFrom.get('qualite_fr').value,this.reference,this.date,this.statut,this.plan);

		this.service.createRessources('/demandeur/saveDemandeur', this.creationDossierForm)
			.subscribe(data => {
				alert('Demande est ajoutée avec succée');
			}, err => {
				console.log(err);
			});
		this.router.navigate(['/depot'],{state: {reference: this.reference,date: this.date, id: this.LastdemandeId,nomDem: this.demandeurFrom.get('nomDemandeur_fr').value,preDem: this.demandeurFrom.get('preDemandeur_fr').value, statut: this.statut}});
	}
	public generateReference(id) {
  		// console.log('LISM' + new Date(this.today).toLocaleDateString().replace(/-|\//g,'') + id.toString());
  		return 'LISM' + new Date(this.today).toLocaleDateString().replace(/-|\//g,'') + id.toString();
  }
}
