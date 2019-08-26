// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { AdminComponent } from './admin.component';

@NgModule({
	imports: [
		CommonModule,
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
	providers: [],
	declarations: [
		AdminComponent,
	]
})
export class AdminModule {
}
