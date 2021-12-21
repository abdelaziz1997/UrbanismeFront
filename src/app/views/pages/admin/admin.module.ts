// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// NgBootstrap
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { AdminComponent } from './admin.component';
import {HttpUtilsService, InterceptService, LayoutUtilsService, TypesUtilsService} from '../../../core/_base/crud';
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
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
@NgModule({
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
		MatCheckboxModule,
		MatSliderModule,
		MatAutocompleteModule,
		MatCardModule,
		MatSelectModule,
		MatTooltipModule,
		MatRadioModule,
		MatChipsModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatTableModule,
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
		PartialsModule,
		CoreModule,
		NgbModule,
		RouterModule.forChild([
			{
				path: '',
				component: AdminComponent
			},
		]),
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
	declarations: [
		AdminComponent,
	]
})
export class AdminModule {
}
