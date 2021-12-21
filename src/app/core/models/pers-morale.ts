import {PersPhysique} from './pers-physique';

export class PersMorale {
	qualiteMaitre: string;
	groupementCabinet: boolean;
	raisonSociale: string;
	rC: string;
	iCE: string;
	iFcode: string;
	patante: string;
	adresse: string;
	codePostal: string;
	ville: string;
	pays: string;
	representantMorPhy: PersPhysique[] = new Array();
}
