import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModelService, Role, User} from './model.service';
import {CreationDossierForm} from "../forms/creation-dossier-form";
import {Dossier} from "../models/dossier";

@Injectable({
	providedIn: 'root'
})
export class DemandeService {
	constructor(private _service: ModelService) { }

	public getDemandeLastID(): Observable<any> {
		return this._service.getRessources('/demande/maxId');
	}
	public getDemandes(): Observable<any> {
		return this._service.getRessources('/demandes');
	}
	public saveDemandeurDemande(element: CreationDossierForm): Observable<any> {
		return this._service.createRessources('/demandeur/saveDemandeur',element);
	}
	public imprimerDemAut(element: string): Observable<any> {
		return this._service.createRessources('/ImprimerDemande/',element);
	}
	public depotDossier(element: Dossier): Observable<any> {
		return this._service.createRessources('/depotDossier',element);
	}
}

