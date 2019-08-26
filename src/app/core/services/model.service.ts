import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export class Poste {
	constructor(
		public codePost: string,
		public descriptionPoste: string,
		public libellePost: string
	) {}
}
export class Societe {
	constructor(
		public codeSociete: string,
		public nomSociete: string
	) {}
}
export class Competence {
	constructor(
		public codeCompetance: string,
		public nomCompetence: string
	) {}
}

export class CV {
	constructor(
		public codeCV: string,
		public modele: string,
		public nomCV: string,
		public posteDesire: string,
		public profil: string
	) {}
}

export class Langues {
	constructor(
		public codeLangue: string,
		public langue: string
	) {}
}
export class SecteurActivite {
	constructor(
		public codeSecteur: string,
		public libelleSecteur: string
	) {}
}
export class SituationFamiliale {
	constructor(
		public codeSituationFamiliale: string,
		public civilite: string
	) {}
}
export class TypeProfil {
	constructor(
		public codeTypeProfil: string,
		public libelleProfil: string
	) {}
}
export class TypeContrat {
	constructor(
		public codeTypeContrat: string,
		public libelleContrat: string
	) {}
}
export class Profil {
	constructor(
		public  codeProfil: string,
		public  adresse: string,
		public  cimr: string,
		public  cin: string,
		public  civilite: string,
		public  cnss: string,
		public  dateNaissance: string,
		public  email: string,
		public  nom: string,
		public  permisConduite: string,
		public  photo: string,
		public  prenom: string,
		public  rib: string,
		public  tel: string
	) {

	}
}
export class Formation {
	constructor(
		public  id_formation: string,
		public  dateDebut: string,
		public  dateFin: string,
		public  details: string,
		public  etablissement: string,
		public  intitule: string,
		public  lieu: string,
		public  profil: string
	) {}
}

export class Experience {
	constructor(
		public codeExperience: string,
		public dateDebut: string,
		public dateFin: string,
		public departement: string,
		public descriptionRole: string,
		public societe: string,
		public poste: string,
		public cv: string,
		public profil: string,
		public mcs: string[]
	) {}
}

export class CompetenceCV {
	constructor(
		public competence: string,
		public niveau: string,
		public details: string,
		public cv: string,
	) {}
}

export class LngCV {
	constructor(
		public lng: string,
		public niveau: string,
		public details: string,
		public cv: string,
	) {}
}

export class SaCV {
	constructor(
		public sa: string,
		public dd: string,
		public df: string,
		public cv: string,
	) {}
}

export class SfCV {
	constructor(
		public sf: string,
		public dd: string,
		public df: string,
		public cv: string,
	) {}
}

export class TpCV {
	constructor(
		public tp: string,
		public dd: string,
		public df: string,
		public cv: string,
	) {}
}

export class TcCV {
	constructor(
		public tc: string,
		public dd: string,
		public df: string,
		public cv: string,
	) {}
}

@Injectable({
	providedIn: 'root'
})
export class ModelService {
	private user: User;

	public host: string = 'https://urbanisme-back.herokuapp.com/';

	constructor( private http: HttpClient) { }

	public getRessources(url) {
		return this.http.get(this.host + url);
	}

	getDemandes(): Observable<any> {
		return this.http.get(this.host + '/demandes');
	}
	public createRessources(url,element) {
		return this.http.post(this.host + url,element);
	}

	updateRessources(url,element) {
		return this.http.put(this.host + url,element);
	}

	public deleteRessources(url) {
		return this.http.delete(this.host + url);
	}

	setter(user: User,roles: Role[]) {
		this.user = user;
		this.user.role = [];
		for (let element of roles) {
			if (element.name == 'ROLE_ADMIN') {
				user.role.push('admin');
			} else if (element.name == 'ROLE_RECRUTEUR') {
				user.role.push('recruteur');
								} else if (element.name == 'ROLE_RESPONSABLE') {
				user.role.push('responsable');
								}
		}
	}

	getter() {
		return this.user;
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

