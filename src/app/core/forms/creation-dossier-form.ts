export class CreationDossierForm {
	constructor(
		public nomDemandeur_ar: string,
		public nomDemandeur_fr: string,
		public preDemandeur_ar: string,
		public preDemandeur_fr: string,
		public qualite_ar: string,
		public qualite_fr: string,
		public reference: string,
		public date_depot: Date,
		public status: string,
		public plan: string
	) {}
}
