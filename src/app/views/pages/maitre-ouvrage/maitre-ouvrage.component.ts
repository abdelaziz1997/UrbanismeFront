import {Component, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PersPhysique} from '../../../core/models/pers-physique';
import {PersMorale} from '../../../core/models/pers-morale';
import {AdminPub} from '../../../core/models/admin-pub';
import {Formulaire} from '../../../core/models/formulaire';

@Component({
  selector: 'kt-maitre-ouvrage',
  templateUrl: './maitre-ouvrage.component.html',
  styleUrls: ['./maitre-ouvrage.component.scss']
})
export class MaitreOuvrageComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private _formBuilder: FormBuilder) { }
	selectedType: string = 'physique';
	minDate = new Date(Date.now());
	maxDate = new Date(Date.now());
	hide = true;

	maitreOuvrageForm: FormGroup;
	civiliteEntries = [
		{ 'key': 'monsieur', 'value': 'M.' },
		{ 'key': 'mademoiselle', 'value': 'Mlle' },
		{ 'key': 'madame', 'value': 'Mme' }
	];

  ngOnInit() {
	  this.maitreOuvrageForm = this._formBuilder.group({
		  civilite: ['', Validators.required],
		  cin: ['', Validators.required],
		  nom: ['', Validators.required],
		  prenom: ['', Validators.required],
		  lieu_deli: ['', Validators.required],
		  dtFinVal: ['', Validators.required],
		  dt_naissance: ['', Validators.required],
		  lieu_naissance: ['', Validators.required],
		  nationalite: ['', Validators.required],
		  profession: ['', Validators.required],
		  nomPere: ['', Validators.required],
		  nomMere: ['', Validators.required],
		  email: ['', [Validators.required,Validators.email]],
		  tel: ['', Validators.required],
		  adresse: ['', Validators.required],
		  code_postal: ['', Validators.required],
		  ville: ['', Validators.required],
		  pays: ['', Validators.required],
		  rs: ['', Validators.required],
		  rc: ['', Validators.required],
		  ice: ['', Validators.required],
		  patente: ['', Validators.required],
		  if: ['', Validators.required],
		  adresseSoc_mor: ['', Validators.required],
		  code_postalSoc_mor: ['', Validators.required],
		  villeSoc_mor: ['', Validators.required],
		  paysSoc_mor: ['', Validators.required],
		  representant_morale: this._formBuilder.array([
			  this._formBuilder.group(
				  {
					  civilite_mor: ['', Validators.required],
					  cin_mor: ['', Validators.required],
					  nom_mor: ['', Validators.required],
					  prenom_mor: ['', Validators.required],
					  lieu_deliv_mor: ['', Validators.required],
					  dtFinVal_mor: ['', Validators.required],
					  dt_naissance_mor: ['', Validators.required],
					  lieu_naissance_mor: ['', Validators.required],
					  nationalite_mor: ['', Validators.required],
					  profession_mor: ['', Validators.required],
					  nomPere_mor: ['', Validators.required],
					  prePere_mor: ['', Validators.required],
					  email_mor: ['', [Validators.required,Validators.email]],
					  tel_mor: ['', Validators.required],
					  adresse_mor: ['', Validators.required],
					  code_postal_mor: ['', Validators.required],
					  ville_mor: ['', Validators.required],
					  pays_mor: ['', Validators.required]
				  })]),

		  denom: ['', Validators.required],
		  qualite: ['', Validators.required],
		  representant_admin: this._formBuilder.array([
			  this._formBuilder.group(
				  {
					  civilite_adm: ['', Validators.required],
					  cin_adm: ['', Validators.required],
					  nom_adm: ['', Validators.required],
					  pre_adm: ['', Validators.required],
					  email_adm: ['', [Validators.required,Validators.email]],
					  tel_adm: ['', Validators.required]
				  })]),
	  });
  }

	setType(persType: string) {
		this.selectedType = persType;
		console.log(this.selectedType);
	}
	isSelected(persType: string): boolean {
		if (!this.selectedType) {
			return false;
		}

		return (this.selectedType === persType);
	}
	getErrorMessage() {
		return this.maitreOuvrageForm.get('email').hasError('required') ? 'You must enter a value' :
			this.maitreOuvrageForm.get('email').hasError('email') ? 'Not a valid email' :
				'';
	}

	passBack() {
  	let f = new Formulaire();
  	    if (this.selectedType === 'physique') {
			f.pers = new PersPhysique();
			f.pers.nom = this.maitreOuvrageForm.get('nom').value;
			f.pers.prenom = this.maitreOuvrageForm.get('prenom').value;
			f.pers.civilite = this.maitreOuvrageForm.get('civilite').value;
			f.pers.numCin_passport_titreSejour = this.maitreOuvrageForm.get('cin').value;
			f.pers.lieuDelivrancePieceId = this.maitreOuvrageForm.get('lieu_deli').value;
			f.pers.dateFinValidId = this.maitreOuvrageForm.get('dtFinVal').value;
			f.pers.dateNaissance = this.maitreOuvrageForm.get('dt_naissance').value;
			f.pers.lieuNaissance = this.maitreOuvrageForm.get('lieu_naissance').value;
			f.pers.nationalite = this.maitreOuvrageForm.get('nationalite').value;
			f.pers.profession = this.maitreOuvrageForm.get('profession').value;
			f.pers.nomPere = this.maitreOuvrageForm.get('nomPere').value;
			f.pers.nomMere = this.maitreOuvrageForm.get('nomMere').value;
			f.pers.email = this.maitreOuvrageForm.get('email').value;
			f.pers.telephone = this.maitreOuvrageForm.get('tel').value;
			f.pers.adresse = this.maitreOuvrageForm.get('adresse').value;
			f.pers.codePostal = this.maitreOuvrageForm.get('code_postal').value;
			f.pers.ville = this.maitreOuvrageForm.get('ville').value;
			f.pers.pays = this.maitreOuvrageForm.get('pays').value;
			f.type = this.selectedType;
			this.activeModal.close(f);
		} else if (this.selectedType === 'morale') {
			f.pers = new PersMorale();
			f.pers.RC = this.maitreOuvrageForm.get('rc').value;
			f.pers.ICE = this.maitreOuvrageForm.get('ice').value;
			f.pers.patante = this.maitreOuvrageForm.get('patente').value;
			f.pers.adresse = this.maitreOuvrageForm.get('adresse_mor').value;
			f.pers.codePostal = this.maitreOuvrageForm.get('code_postal_mor').value;
			f.pers.pays = this.maitreOuvrageForm.get('pays_mor').value;
			f.pers.raisonSociale = this.maitreOuvrageForm.get('rs').value;
			f.pers.ville = this.maitreOuvrageForm.get('ville_mor').value;
			// console.log(persMor);
			this.representant_morale.value.forEach(obj => {
				let rep = new PersPhysique();
				rep = obj;
				f.pers.persPhysiques.push(rep);
			});
			f.type = this.selectedType;
			this.activeModal.close(f);
		} else if (this.selectedType === 'administration') {
			f.pers = new AdminPub();
			f.pers.denomination = this.maitreOuvrageForm.get('denom').value;
			f.pers.qualiteAdm = this.maitreOuvrageForm.get('qualite').value;
			this.representant_admin.value.forEach(obj => {
				let rep = new PersPhysique();
				rep = obj;
				f.pers.repPhysiques.push(rep);
			});
			f.type = this.selectedType;
			this.activeModal.close(f);
		}

  	    // console.log(this.representant_morale.value);
		// this.activeModal.close(this.user);
	}
	get representant_morale() {
		return this.maitreOuvrageForm.controls.representant_morale as FormArray;
	}
	addRepMor() {
		this.representant_morale.push(this._formBuilder.group(
			{
				civilite_mor: ['', Validators.required],
				cin_mor: ['', Validators.required],
				nom_mor: ['', Validators.required],
				prenom_mor: ['', Validators.required],
				lieu_deliv_mor: ['', Validators.required],
				dtFinVal_mor: ['', Validators.required],
				dt_naissance_mor: ['', Validators.required],
				lieu_naissance_mor: ['', Validators.required],
				nationalite_mor: ['', Validators.required],
				profession_mor: ['', Validators.required],
				nomPere_mor: ['', Validators.required],
				prePere_mor: ['', Validators.required],
				email_mor: ['', [Validators.required,Validators.email]],
				tel_mor: ['', Validators.required],
				adresseSoc_mor: ['', Validators.required],
				code_postalSoc_mor: ['', Validators.required],
				villeSoc_mor: ['', Validators.required],
				paysSoc_mor: ['', Validators.required]
			}));
	}
	deleteRepMor(index) {
		if (this.representant_morale.length !== 1) {
			this.representant_morale.removeAt(index);
		}
	}
	get representant_admin() {
		return this.maitreOuvrageForm.controls.representant_admin as FormArray;
	}
	addRepAdm() {
		this.representant_admin.push(this._formBuilder.group(this._formBuilder.group(
			{
				civilite_adm: ['', Validators.required],
				cin_adm: ['', Validators.required],
				nom_adm: ['', Validators.required],
				pre_adm: ['', Validators.required],
				email_adm: ['', [Validators.required,Validators.email]],
				tel_adm: ['', Validators.required]
			})));
	}
	deleteRepAdm(index) {
		if (this.representant_admin.length !== 1) {
			this.representant_admin.removeAt(index);
		}
	}
}
