import {Local} from './local';
import {Ingenieur} from './ingenieur';
import {Reference} from './reference';

export class Projet {
	id: number;
	nom_ar: string;
	nom_fr: string;
	objet_ar: string;
	objet_fr: string;
	nbr_niveaux: string;
	nature: string;
	categorie: string;
	type: string;
	localisation: Local;
	ing: Ingenieur[] = new Array();
	references: Reference[] = new Array();
	proprietaires: any;
}
