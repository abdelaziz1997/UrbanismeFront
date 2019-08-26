// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import {AuthGuard} from '../../../core/auth';
import {AuthGaurdService} from '../../../core/auth/auth-gaurd.service';
import {AdminGaurdService} from '../../../core/auth/admin-gaurd.service';
import {DirecteurGaurdService} from '../../../core/auth/directeur-gaurd.service';
import {DirecteurComponent} from '../../pages/directeur/directeur.component';
import {ChefServiceComponent} from '../../pages/chef-service/chef-service.component';
import {ChefSrvGaurdService} from '../../../core/auth/chefsrv-gaurd.service';
import {ChefDeparetementComponent} from '../../pages/chef-deparetement/chef-deparetement.component';
import {ChefDepGaurdService} from '../../../core/auth/chefdep-gaurd.service';
import {DepotComponent} from '../../pages/depot/depot.component';
import {CreationDossierComponent} from '../../pages/creation-dossier/creation-dossier.component';
import {Test} from 'tslint';
import {TestComponent} from '../../pages/test/test.component';
import {MaitreOuvrageComponent} from '../../pages/maitre-ouvrage/maitre-ouvrage.component';
import {CreationDocumentComponent} from '../../pages/creation-document/creation-document.component';
import {SurfaceComponent} from '../../pages/surface/surface.component';
import {UserEditComponent} from '../../pages/user-management/users/user-edit/user-edit.component';
import {RolesListComponent} from '../../pages/user-management/roles/roles-list/roles-list.component';
import {UsersListComponent} from '../../pages/user-management/users/users-list/users-list.component';
import {ListeDossiersComponent} from "../../pages/liste-dossiers/liste-dossiers.component";

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		children: [
			{
				path: 'admin',
				loadChildren: 'app/views/pages/admin/admin.module#AdminModule',
			},
			{
				path: 'directeur',
				component: DirecteurComponent,
			},
			{
				path: 'chefService',
				component: ChefServiceComponent,
			},
			{
				path: 'chefDepartement',
				component: ChefDeparetementComponent,
			},
			{
				path: 'test',
				component: MaitreOuvrageComponent,
			},
			{
				path: 'depot',
				component: DepotComponent,
			},
			{
				path: 'roles',
				component: RolesListComponent
			},
			{
				path: 'users',
				component: UsersListComponent
			},
			{
				path: 'users:id',
				component: UsersListComponent
			},
			{
				path: 'listeDossiers',
				component: ListeDossiersComponent
			},
			{
				path: 'users/add',
				component: UserEditComponent
			},
			{
				path: 'users/add:id',
				component: UserEditComponent
			},
			{
				path: 'users/edit',
				component: UserEditComponent
			},
			{
				path: 'users/edit/:id',
				component: UserEditComponent
			},
			{
				path: 'creerDossier',
				component: CreationDossierComponent,
			},
			{
				path: 'creerDocument',
				component: CreationDocumentComponent,
			},
			{
				path: 'surface',
				component: SurfaceComponent,
			},
			{
				path: 'maitre',
				component: MaitreOuvrageComponent,
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v1',
					'code': 403,
					'title': '403... Accès non autorisé',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: '', redirectTo: '', pathMatch: 'full'},
			{path: '**', redirectTo: '', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
