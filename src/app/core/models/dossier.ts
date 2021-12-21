import {Projet} from './projet';
import {Document} from './document';
import {Bordereau} from './bordereau';

export class Dossier {
	id: number;
	numero: string;
	etat: string;
	date_depot: Date;
	demandeRef: string;
	projet: Projet;
}
