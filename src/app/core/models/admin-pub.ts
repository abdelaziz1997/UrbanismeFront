import {PersPhysique} from './pers-physique';

export class AdminPub {
	qualiteMaitre: string;
	groupementCabinet: boolean;
	denomination: string;
	qualiteAdm: string;
	repPhysiques: PersPhysique[] = new Array();
}
