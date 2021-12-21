export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Programme de Gestion de département d\'urbanisme',
					root: true,
					alignment: 'left',
					page: '/admin',
					translate: 'MENU.DASHBOARD',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/admin',
					translate: 'MENU.DASHBOARD',
					bullet: 'line',
				},
				{
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: '/builder'
				},
				{section: 'Custom'},
				{
					title: 'Custom Link',
					root: true,
					icon: 'flaticon2-link',
					bullet: 'line',
				},
			]
		},
	};
	public directeur: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Espace Directeur',
					root: true,
					alignment: 'center',
					page: '/directeur',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Accueil',
					root: true,
					icon: 'flaticon-home',
					page: '/directeur',
				},
				{
					title: 'Registres',
					root: true,
					icon: 'flaticon2-document',
					page: '/registres',
				},
				{
					title: 'Dossiers',
					root: true,
					icon: 'flaticon-folder',
					page: '/directeur',
					submenu: [
						{
							title: 'Déposer Demande',
							page: '/creerDossier',
							icon: 'flaticon2-plus-1'
						},
						{
							title: 'Dossiers déposés',
							page: '/listeDossiers',
							icon: 'flaticon2-files-and-folders'
						}
					]
				}
			]
		},
	};
	public admin: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Espace Administration',
					root: true,
					alignment: 'center',
					page: '/admin',
					translate: 'MENU.DASHBOARD',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Paramétrage',
					root: true,
					icon: 'flaticon2-settings',
					page: '/admin',
					bullet: 'line',
				},
				{
					title: 'Gestion des utilisateurs',
					root: true,
					icon: 'flaticon2-user-1',
					submenu: [
						{
							title: 'Liste des Utilisateurs',
							page: '/users',
							icon: 'flaticon2-user'
						},
						{
							title: 'Ajouter Utilisateur',
							page: '/users/add',
							icon: 'flaticon2-plus-1'
						}
					]
				}
			]
		},
	};
	public chef_srv: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Espace de Chef de Service',
					root: true,
					alignment: 'center',
					page: '/chefService',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/ChefService',
					translate: 'MENU.DASHBOARD',
					bullet: 'line',
				}
			]
		},
	};
	public chef_dep: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Espace de Chef de Département',
					root: true,
					alignment: 'left',
					page: '/chefDepartement',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'HHHHH',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/chefDepartement',
					translate: 'MENU.DASHBOARD',
					bullet: 'line',
				}
			]
		},
	};
	public get configs(): any {
		return this.defaults;
	}
}
