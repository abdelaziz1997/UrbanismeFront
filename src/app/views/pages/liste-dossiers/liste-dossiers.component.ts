import { AfterViewInit, AfterViewChecked, Input } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


// Models

import {Dossier} from '../../../core/models/dossier';
import {ModelService} from '../../../core/services/model.service';
import {LayoutUtilsService, QueryParamsModel} from '../../../core/_base/crud';
import {SubheaderService} from '../../../core/_base/layout';
import {Demande} from "../../../core/models/demande";

@Component({
  selector: 'kt-liste-dossiers',
  templateUrl: './liste-dossiers.component.html',
  styleUrls: ['./liste-dossiers.component.scss']
})
export class ListeDossiersComponent implements OnInit, OnDestroy {

	// Table fields
	displayedColumns = ['select', 'reference', 'dt', 'etat', 'plan', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;

	// Filter fields
	@ViewChild('searchInput') searchInput: string;
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<Demande>(true, []);
	demandesResult: Demande[] = [];
	demandes = new MatTableDataSource<Demande>();

	/**
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param subheaderService: SubheaderService
	 * @param _userService
	 */
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService,
		private subheaderService: SubheaderService,
		private modelService: ModelService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {

		// Set title to page breadCrumbs
		this.subheaderService.setTitle('Gestion des Dossiers');
		this.getAllDemandes();

	}



	/**
	 * On Destroy
	 */
	ngOnDestroy() {
	}

	getAllDemandes() {
		this.modelService.getDemandes().subscribe(
			data => {
				this.demandesResult = data;
				this.demandes.data = data as Demande[];
				return data;
			}
		);
	}

	/**
	 *
	 */
	ngAfterViewInit(): void {
		this.demandes.sort = this.sort;
		this.demandes.paginator = this.paginator;
	}

	/** ACTIONS */
	/**
	 * Delete user
	 *
	 * @param _item: User
	 */
	/*deleteUser(_item: User) {
		const _title: string = "Supprimer l'utilisateur";
		const _description: string = 'Etes-vous sûr de supprimer définitivement cet utilisateur?';
		const _waitDesciption: string = "Suppression de l'utilisateur...";
		const _deleteMessage = "L'utilisateur a été supprimé";

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this._userService.deleteUser(_item)
				.subscribe( data => {
					this.usersResult = this.usersResult.filter(u => u !== _item);
				});
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.getAllUsers();
		});
	}*/

	/**
	 * Fetch selected rows
	 */
	fetchDemandes() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.reference}, ${elem.date_depot}`,
				plan: elem.plan,
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.demandesResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle selection
	 */
	masterToggle() {
		if (this.selection.selected.length === this.demandesResult.length) {
			this.selection.clear();
		} else {
			this.demandesResult.forEach(row => this.selection.select(row));
		}
	}

	/**
	 *
	 * @param value
	 */
	public doFilter = (value: string) => {
		this.demandes.filter = value.trim().toLocaleLowerCase();
	}

	/**
	 * Redirect to edit page
	 *
	 * @param id
	 */
	/*editUser(id) {
		this.router.navigate(['../users/edit', id], { relativeTo: this.activatedRoute });
	}*/

	ValiderDemande(id: any) {

	}

	deleteDemande(demande: any) {

	}
}
