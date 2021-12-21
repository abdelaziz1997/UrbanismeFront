// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// NgBootstrap
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { DirecteurComponent } from './directeur/directeur.component';
import {AdminComponent} from './admin/admin.component';
import { ChefServiceComponent } from './chef-service/chef-service.component';
import { ChefDeparetementComponent } from './chef-deparetement/chef-deparetement.component';
import { DepotComponent } from './depot/depot.component';
import {
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule, MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule, MatMenuModule, MatNativeDateModule,
	MatPaginatorModule, MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSliderModule,
	MatSnackBarModule, MatSortModule,
	MatStepperModule,
	MatTableModule, MatTabsModule,
	MatTooltipModule
} from '@angular/material';
import {MaterialPreviewModule} from '../partials/content/general/material-preview/material-preview.module';
import { CreationDossierComponent } from './creation-dossier/creation-dossier.component';
import { TestComponent } from './test/test.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { CategorieDocComponent } from './categorie-doc/categorie-doc.component';
import { MaitreOuvrageComponent } from './maitre-ouvrage/maitre-ouvrage.component';
import { CreationDocumentComponent } from './creation-document/creation-document.component';
import {SurfaceComponent} from './surface/surface.component';
import {AgmCoreModule} from '@agm/core';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserEditComponent} from './user-management/users/user-edit/user-edit.component';
import {AddressComponent} from './user-management/users/_subs/address/address.component';
import {UserRolesListComponent} from './user-management/users/_subs/user-roles/user-roles-list.component';
import {RolesListComponent} from './user-management/roles/roles-list/roles-list.component';
import {ChangePasswordComponent} from './user-management/users/_subs/change-password/change-password.component';
import {SocialNetworksComponent} from './user-management/users/_subs/social-networks/social-networks.component';
import {UsersListComponent} from './user-management/users/users-list/users-list.component';
import {RoleEditDialogComponent} from './user-management/roles/role-edit/role-edit.dialog.component';
import {RouterModule} from '@angular/router';
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent
} from '../partials/content/crud';
import {HttpUtilsService, InterceptService, LayoutUtilsService, TypesUtilsService} from '../../core/_base/crud';
import {UserManagementModule} from "./user-management/user-management.module";
import { ListeDossiersComponent } from './liste-dossiers/liste-dossiers.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { DemandeAutorisationComponent } from './demande-autorisation/demande-autorisation.component';
import { BordereauComponent } from './bordereau/bordereau.component';
import { RegistresComponent } from './registres/registres.component';

@NgModule({
	declarations: [
		DirecteurComponent,
		ChefServiceComponent,
		ChefDeparetementComponent,
		DepotComponent,
		CreationDossierComponent,
		TestComponent,
		CategorieDocComponent,
		MaitreOuvrageComponent,
		CreationDocumentComponent,
		SurfaceComponent,
		ListeDossiersComponent,
		DemandeAutorisationComponent,
		BordereauComponent,
		RegistresComponent
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,],
	entryComponents: [
		CategorieDocComponent,
		SurfaceComponent,
		MaitreOuvrageComponent,
		ActionNotificationComponent,
		RoleEditDialogComponent,
		FetchEntityDialogComponent,
		DeleteEntityDialogComponent],
	imports: [
		CommonModule,
		ScrollToModule.forRoot(),
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		MatListModule,
		MatIconModule,
		MatStepperModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MaterialPreviewModule,
		MatCheckboxModule,
		MatSliderModule,
		MatAutocompleteModule,
		MatCardModule,
		MatSelectModule,
		MatTooltipModule,
		MatRadioModule,
		MatChipsModule,
		PdfViewerModule,
		NgxExtendedPdfViewerModule,
		PerfectScrollbarModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatTableModule,
		AgmCoreModule,
		RouterModule,
		MatSortModule,
		MatMenuModule,
		MatProgressBarModule,
		MatDialogModule,
		MatTabsModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		UserManagementModule,
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
		NgbActiveModal,
	],
	bootstrap: [UserEditComponent],
})
export class PagesModule {
}
