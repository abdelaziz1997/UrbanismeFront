import {PersPhysique} from './pers-physique';

export class PersMorale {
	qualiteMaitre: string;
	groupementCabinet: boolean;
	raisonSociale: string;
	RC: string;
	ICE: string;
	IF: string;
	patante: string;
	adresse: string;
	codePostal: string;
	ville: string;
	pays: string;
	persPhysiques: PersPhysique[] = new Array();
}
