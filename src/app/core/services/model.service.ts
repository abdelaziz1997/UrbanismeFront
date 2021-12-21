import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { saveAs } from 'file-saver';

export class User {
	constructor(
		public id: string,
		public username: string,
		public password: string,
		public name: string,
		public email: string,
		public role: string[]
	) {}
}

export class Role {
	constructor(
		public id: string,
		public name: string
	) {}
}

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	public host: string = 'http://localhost:8080';

	constructor( private http: HttpClient) { }

	public getRessources(url) {
		return this.http.get(this.host + url);
	}
	public getRessourcesFile(url, element) {
		return this.http.get(this.host + url,element);
	}

	public createRessources(url,element) {
		return this.http.post(this.host + url,element);
	}
	public imprimerDemande(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'demande.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'demande.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerIdentite(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'identite.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'identite.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre5(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre6(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre4(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre3(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre2(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}
	public imprimerRegistre1(url,element) {
		let mediaType = 'application/pdf';
		return this.http.post(this.host + url + element, {location: 'registre.pdf'}, { responseType: 'blob'}).subscribe(
			(response) => {
				let blob = new Blob([response], { type: mediaType });
				saveAs(blob, 'registre.pdf');
			},
			e => { throwError(e); }
		);
	}


	updateRessources(url,element) {
		return this.http.put(this.host + url,element);
	}

	public deleteRessources(url) {
		return this.http.delete(this.host + url);
	}

	public uploadPhotoProfil(file: File, idProfil): Observable<HttpEvent<{}>> {
		const formData = new FormData();

		formData.append('file', file);
		const req = new HttpRequest('POST',this.host + '/uploadPhoto/' + idProfil,formData,{
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}

}

