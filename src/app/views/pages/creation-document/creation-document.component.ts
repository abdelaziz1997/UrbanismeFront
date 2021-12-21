import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MaitreOuvrageComponent} from '../maitre-ouvrage/maitre-ouvrage.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategorieDocComponent} from '../categorie-doc/categorie-doc.component';
import {Router} from "@angular/router";
import {DemandeService} from "../../../core/services/demande.service";
import {ModelService} from "../../../core/services/model.service";

@Component({
  selector: 'kt-creation-document',
  templateUrl: './creation-document.component.html',
	encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creation-document.component.scss'],
	styles: [`
    @media screen {
		.modal-adaptive .modal-lg {
			width: 80% !important;
			max-width: calc(80%);
		}
	}
	`]
})
export class CreationDocumentComponent implements OnInit {
	nomDem: string;
	preDem: string;
	nomOuv: string = 'elhass';
	preOuv: string = 'Abdelaziz';
	statut: string;
	today: Date ;
	refDem: string;
	refDoss: number;
	step = 0;
	pdfSrcDoc1: string;
	pdfSrcDoc2: string;
	pdfSrcDoc3: string;
	pdfSrcDoc4: string;
  constructor(private modalService: NgbModal, private router: Router, private service: DemandeService, private _service: ModelService) { }

  ngOnInit() {
	  this.nomDem = history.state.nomDem;
	  this.preDem = history.state.preDem;
	  this.refDoss = history.state.id;
	  this.refDem = history.state.reference;
	  this.today = history.state.date;
	  this.statut = history.state.statut;
  }

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	onFileInput($event: Event,type: string) {
		let $img: any;


		if (typeof (FileReader) !== 'undefined') {
			let reader = new FileReader();
			switch (type) {
				case 'doc1':
					$img = document.querySelector('#file1');
					reader.onload = (e: any) => {
						this.pdfSrcDoc1 = e.target.result;
					};
					break;
				case 'doc2':
					$img = document.querySelector('#file2');
					reader.onload = (e: any) => {
						this.pdfSrcDoc2 = e.target.result;
					};
					break;
				case 'doc3':
					$img = document.querySelector('#file3');
					reader.onload = (e: any) => {
						this.pdfSrcDoc3 = e.target.result;
					};
					break;
				case 'doc4':
					$img = document.querySelector('#file4');
					reader.onload = (e: any) => {
						this.pdfSrcDoc4 = e.target.result;
					};
					break;
			}
			reader.readAsArrayBuffer($img.files[0]);
		}
	}

	showDoc(type: string) {
		const modalRef = this.modalService.open(CategorieDocComponent,{size: 'lg', windowClass: 'modal-adaptive'});
		modalRef.componentInstance.Title = 'Document';
		switch (type) {
			case 'doc1':
				modalRef.componentInstance.pdfSrc = this.pdfSrcDoc1;
				break;
			case 'doc2':
				modalRef.componentInstance.pdfSrc = this.pdfSrcDoc2;
				break;
			case 'doc3':
				modalRef.componentInstance.pdfSrc = this.pdfSrcDoc3;
				break;
			case 'doc4':
				modalRef.componentInstance.pdfSrc = this.pdfSrcDoc4;
				break;
		}
  }

	impDemAut() {
/*		var mediaType = 'application/pdf';
		this.http.post(this.myUrl, {location: "report.pdf"}, { responseType: 'blob' }).subscribe(
			(response) => {
				var blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'report.pdf');
			},
			e => { throwError(e); }
		);*/
		this._service.imprimerDemande('/ImprimerDemande/',this.refDem);
  		/*this.service.imprimerDemAut(this.refDem).subscribe(data => {
		}, err => {
			console.log(err);
		});*/
		//this.router.navigate(['/ImprimerAutorisation']);
	}

	impIdEng() {
		this._service.imprimerIdentite('/ImprimerIdentite/',this.refDem);
	}

	listeLoi() {

	}

	bordereau() {
		this.router.navigate(['/bordereau']);
	}

	save() {
		this.router.navigate(['/listeDossiers']);
	}
}
