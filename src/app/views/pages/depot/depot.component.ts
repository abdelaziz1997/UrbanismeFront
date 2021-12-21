import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit, ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategorieDocComponent} from '../categorie-doc/categorie-doc.component';
import {MaitreOuvrageComponent} from '../maitre-ouvrage/maitre-ouvrage.component';
import {Router} from '@angular/router';
import {Localisation} from '../../../core/models/localisation';
import {SurfaceComponent} from '../surface/surface.component';
import {CreationDossierComponent} from '../creation-dossier/creation-dossier.component';
import {PersPhysique} from '../../../core/models/pers-physique';
import {Projet} from '../../../core/models/projet';
import {Local} from '../../../core/models/local';
import {Surface} from '../../../core/models/surface';
import {Ingenieur} from '../../../core/models/ingenieur';
import {Dossier} from '../../../core/models/dossier';
import {LayoutUtilsService, MessageType} from '../../../core/_base/crud';
import {ViewRef_} from "@angular/core/src/view";
import {ModelService} from "../../../core/services/model.service";
import {DemandeService} from "../../../core/services/demande.service";
import {Reference} from "../../../core/models/reference";
declare const google: any;
@Component({
  selector: 'kt-depot',
  templateUrl: './depot.component.html',
	encapsulation: ViewEncapsulation.None,
  styleUrls: ['./depot.component.scss'],
	styles: [`
    @media screen {
		.modal-adaptive .modal-lg {
			width: 80% !important;
			max-width: calc(80%);
		}
	}
	`]
})

export class DepotComponent implements OnInit {
	loading = false;
	isLinear = false;
	today: Date;
	nomDem: string;
	preDem: string;
	nomOuv: string = 'XXXXXXXXX';
	preOuv: string = 'XXXXXXXXX';
	statut: string;
	maitreForm: FormGroup;
	projetForm: FormGroup;
	maitreOuv = new Array();
	maitreNom: string;
	localisationForm: FormGroup;
	references: string[] = [];
	selectable: boolean = true;
	removable: boolean = true;
	addOnBlur: boolean = true;
	projet: Projet = new Projet();
	loc: Local = new Local();
	surface: Surface = new Surface();
	selectedQualite: number;
	ings: Ingenieur[] = new Array();
	ingen: Ingenieur;
	separatorKeysCodes = [ENTER, COMMA];
	refDem: string;
	dossier: Dossier = new Dossier();
	reference: Reference;
	value: string;
	selectedValue2: any;
	center: any = {
		lat: 33.5362475,
		lng: -111.9267386
	};

	qua_fr = [ 	{key: 'GERANT_SOCIETE',value: 'Gérant de Société'},
					{key: 'LOCATAIRE',value: 'Locataire'},
					{key: 'MANDATAIRE',value: 'Mandataire'},
					{key: 'PROPRIETAIRE_MAJEUR',value: 'Propriétaire Majeur'},
					{key: 'PROPRIETAIRE_MINEUR',value: 'Propriétaire Mineur'},
					{key: 'PROPRIETAIRE_ORPHELIN_MINEUR',value: 'Propriétaire Orphelin Mineur'},
	];

	coordinatesPoly: Localisation[] = [];
	isChecked: boolean = false;
	isChecked2: boolean = false;
	refDoss: number;
	surTerrain: number;
	numDossier: any;

	constructor(private _formBuilder: FormBuilder, private modalService: NgbModal,
				private _cd: ChangeDetectorRef,private router: Router,private service: DemandeService, private layoutUtilsService: LayoutUtilsService) {
		_cd.detach();
		setInterval(() => {
			if (_cd !== null && _cd !== undefined &&
				!(_cd as ViewRef_).destroyed) {
				_cd.detectChanges();
			}
		}, 100);
	}

	ngOnInit(): void {
		this.nomDem = history.state.nomDem;
		this.preDem = history.state.preDem;
		this.refDoss = history.state.id;
		this.refDoss++;
		this.refDem = history.state.reference;
		this.today = history.state.date;
		this.statut = history.state.statut;
		this.createMaitreForm();
		this.createProjetForm();
		this.createLocalisationForm();
	}

	/*-----<Initialisation des Forms>-----*/
	private createMaitreForm() {
		this.maitreForm = this._formBuilder.group({
			maitres: this._formBuilder.array([
				this._formBuilder.group(
					{qualiteMaitre_fr: '',qualiteMaitre_ar: '',grpCabinet: ''})])
		});
	}
	private createProjetForm() {
		this.projetForm = this._formBuilder.group({
			nomPrj_fr: ['', Validators.required],
			nomPrj_ar: ['', Validators.required],
			objetPrj_fr: ['', Validators.required],
			objetPrj_ar: ['', Validators.required],
			naturePrj: ['', Validators.required],
			categoriePrj: ['', Validators.required],
			typePrj: ['', Validators.required],
			niveau: ['', Validators.required],
			reference: ['', Validators.required],
			c1: ['', Validators.required],
			c2: ['', Validators.required],
			c3: ['', Validators.required],
			ingenieurs: this._formBuilder.array([
				this._formBuilder.group(
					{ingenieur: ['',Validators.required]})])
		});
	}
	private createLocalisationForm() {
		this.localisationForm = this._formBuilder.group({
			adresse_fr: ['', Validators.required],
			adresse_ar: ['', Validators.required],
			surface_terrain: ['', Validators.required]
		});
	}

	/*-----<Ajout et suppression des références frontières>-----*/
	add(): void {
		const c1 = this.projetForm.get('c1').value;
		const c2 = this.projetForm.get('c2').value;
		const c3 = this.projetForm.get('c3').value;
		this.value = c1 + c2 + '/' + c3;
		console.log(this.value);
		// Ajouter une référence frontière
		if ((this.value || '').trim()) {
			this.references.push(this.value.trim());
		}
		console.log(this.references);
	}
	remove(ref: any): void {
		const index = this.references.indexOf(ref);
		if (index >= 0) {
			this.references.splice(index, 1);
		}
	}

	/*-----<Modal (Popup)>-----*/
	openCategorieDoc() {
		const modalRef = this.modalService.open(CategorieDocComponent,{size: 'lg', windowClass: 'modal-adaptive'});

		modalRef.componentInstance.Title = 'Catégorie de Projet';
		modalRef.componentInstance.pdfSrc = './assets/media/doc-utils/cat-doc.pdf';
	}
	openMaitre(index) {
		const modalRef = this.modalService.open(MaitreOuvrageComponent,{size: 'lg', windowClass: 'modal-adaptive'}).result.then((result) => {
			if (result) {
				switch (result.type) {
					case 'physique':
						this.maitreNom = result.persPhysique.nom + ' ' + result.persPhysique.prenom;
						break;
					case 'morale':
						this.maitreNom = result.persMorale.RC;
						break;
					case 'administration':
						this.maitreNom = result.adminPub.denomination;
						break;
				}

				console.log(result);
				this.maitreOuv.push(result);
			}
		});
	}
	openSurface() {
		const modalRef = this.modalService.open(SurfaceComponent,{size: 'lg'}).result.then((result) => {
			if (result) {
				this.surface = result;
				this.surTerrain = this.surface.surfaceTerrain;
			}
		});
	}

	/*-----<MAP>-----*/
	onMapReady(map) {
		this.initDrawingManager(map);

	}
	initDrawingManager(map: any) {
		const options = {
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: ['polygon']
			},
			polygonOptions: {
				draggable: true,
				editable: true
			},
			drawingMode: google.maps.drawing.OverlayType.POLYGON
		};

		const drawingManager = new google.maps.drawing.DrawingManager(options);
		drawingManager.setMap(map);
		let self = this;
		let position: Localisation;
		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(polygon) {
			let coordinatesArray = polygon.overlay.getPath().getArray();
			for (let i = 0;i < coordinatesArray.length;i++) {
				position = new Localisation();
				position.lat = coordinatesArray[i].lat();
				position.long = coordinatesArray[i].lng();
				self.coordinatesPoly.push(position);
			}
			polygon.overlay.addListener('dragend', function() {
				let coordinates = polygon.overlay.getPath().getArray();
				self.coordinatesPoly = [];
				for (let i = 0;i < coordinates.length;i++) {
					position = new Localisation();
					position.lat = coordinates[i].lat();
					position.long = coordinates[i].lng();
					self.coordinatesPoly.push(position);
				}
				console.log('hhhh');
			});
		});
		console.log(this.coordinatesPoly);
	}

	/*-----<Form Reactive (getter/Ajout/Suppression>-----*/
	get maitres() {
		return this.maitreForm.controls.maitres as FormArray;
	}
	addMaitre() {
		if (this.maitres.length >= 1) {
			this.isChecked = true;
		} else {
			this.isChecked = false;
		}
		this.maitres.push(this._formBuilder.group({qualiteMaitre_fr: '',qualiteMaitre_ar: '', maitreOuvrage: '',grpCabinet: ''}));
	}
	deleteMaitre(index) {
		this.maitres.removeAt(index);
	}

	get ingenieurs() {
		return this.projetForm.get('ingenieurs') as FormArray;
	}
	addIngenieur() {
		if (this.ingenieurs.length >= 1) {
			this.isChecked2 = true;
		} else {
			this.isChecked2 = false;
		}
		this.ingenieurs.push(this._formBuilder.group({ingenieur: ['',Validators.required]}));
	}
	deleteIngenieur(index) {
		this.ingenieurs.removeAt(index);
	}

	/*-----<Submit>-----*/
	save() {
		let cmp = 0;
		// Maitre Ouvrage
		this.maitreOuv.forEach(maitre => {

			switch (maitre.type) {
				case 'physique':
					maitre.persPhysique.qualiteMaitre = this.maitres.at(cmp).value.qualiteMaitre_fr;
					maitre.persPhysique.groupementCabinet = this.maitres.at(cmp).value.grpCabinet;
					break;
				case 'morale':
					console.log(this.maitres.at(cmp));
					console.log( this.maitres.at(cmp).value);
					maitre.persMorale.qualiteMaitre = this.maitres.at(cmp).value.qualiteMaitre_fr;
					maitre.persMorale.groupementCabinet = this.maitres.at(cmp).value.grpCabinet;
					break;
				case 'administration':
					maitre.adminPub.qualiteMaitre = this.maitres.at(cmp).value.qualiteMaitre_fr;
					maitre.adminPub.groupementCabinet = this.maitres.at(cmp).value.grpCabinet;
					break;
			}
			cmp++;
		});
		// Projet
		this.projet.nom_fr = this.projetForm.get('nomPrj_fr').value;
		this.projet.nom_ar = this.projetForm.get('nomPrj_ar').value;
		this.projet.objet_fr = this.projetForm.get('objetPrj_fr').value;
		this.projet.objet_ar = this.projetForm.get('objetPrj_ar').value;
		this.projet.nature = this.projetForm.get('naturePrj').value;
		this.projet.categorie = this.projetForm.get('categoriePrj').value;
		this.projet.type = this.projetForm.get('typePrj').value;
		this.projet.nbr_niveaux = this.projetForm.get('niveau').value;
		// this.projet.ref = this.references;
		this.references.forEach(ref => {
			this.reference = new Reference();
			this.reference.ref = ref;
			this.projet.references.push(this.reference);
		});

		for (let ingenieursKey of this.ingenieurs.value) {
			this.ingen = new Ingenieur();
			this.ingen.nomComplet = ingenieursKey.ingenieur;
			this.ings.push(this.ingen);
			console.log(ingenieursKey.ingenieur);
		}
		// localisation
		this.loc.adresse_ar = this.localisationForm.get('adresse_ar').value;
		this.loc.adresse_fr = this.localisationForm.get('adresse_fr').value;
		this.surTerrain = this.surface.surfaceTerrain;
		this.loc.surface = this.surface;
		this.projet.localisation = this.loc;
		console.log(this.maitreOuv);
		this.projet.proprietaires = this.maitreOuv;
		this.projet.ing = this.ings;
		// console.log(this.projet);
		this.dossier.numero = this.refDoss + '/' + this.today.getFullYear();
		this.dossier.demandeRef = this.refDem;
		this.dossier.date_depot = this.today;
		this.dossier.etat = this.statut;
		this.dossier.projet = this.projet;
		console.log(JSON.stringify(this.dossier));
		// const _addMessage = "L'utilisateur a été ajouté avec succès";
		// this.layoutUtilsService.showActionNotification(_addMessage, MessageType.Create);
		this.service.depotDossier(this.dossier)
			.subscribe(data => {
				const _addMessage = 'Le dossier a été créé avec succès';
				this.layoutUtilsService.showActionNotification(_addMessage, MessageType.Create);
			}, err => {
				console.log(err);
			});
		this.router.navigate(['/creerDocument'],{state: {reference: this.refDem,date: this.today, id: this.refDoss,nomDem: this.nomDem,preDem: this.preDem, statut: this.statut}});
	}
}
