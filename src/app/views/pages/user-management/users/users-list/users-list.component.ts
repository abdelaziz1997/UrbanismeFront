import { AfterViewInit, AfterViewChecked, Input } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// LODASH
import { each, find } from 'lodash';
// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

// Services
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { userService } from '../../../../../services/user.service';


// Models
import {
	UsersDataSource,
	
} from '../../../../../core/auth';
import { SubheaderService } from '../../../../../core/_base/layout';
import { User } from "../../../../../classes/user";

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: UsersDataSource;
	displayedColumns = ['select', 'id', 'username', 'email', 'nom', 'prenom', '_roles', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('sort1') sort: MatSort;
	
	// Filter fields
	@ViewChild('searchInput') searchInput: string;
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<User>(true, []);
	usersResult: User[] = [];
	users = new MatTableDataSource<User>();

	/**
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param store: Store<AppState>
	 * @param router: Router
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param subheaderService: SubheaderService
	 */
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService,
		private subheaderService: SubheaderService,
		private _userService: userService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {

		// Set title to page breadCrumbs
		this.subheaderService.setTitle('Gestion des utilisateurs');
        this.getAllUsers();
		
	}



	/**
	 * On Destroy
	 */
	ngOnDestroy() {
	}

	getAllUsers()
	{
		this._userService.getUsers().subscribe(
			data=>{
				this.usersResult = data;
				this.users.data = data as User[];
				return data;
			}
		);
	}

    /**
	 * 
	 */
	ngAfterViewInit(): void {
		this.users.sort = this.sort;
		this.users.paginator = this.paginator;
	  }

	/** ACTIONS */
	/**
	 * Delete user
	 *
	 * @param _item: User
	 */
	deleteUser(_item: User) {
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
	}

	/**
	 * Fetch selected rows
	 */
	fetchUsers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.nom}, ${elem.role}`,
				id: elem.id.toString(),
				status: elem.role
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.usersResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle selection
	 */
	masterToggle() {
		if (this.selection.selected.length === this.usersResult.length) {
			this.selection.clear();
		} else {
			this.usersResult.forEach(row => this.selection.select(row));
		}
	}

	/**
	 * 
	 * @param value
	 */
	public doFilter = (value: string) => {
		this.users.filter = value.trim().toLocaleLowerCase();
	  }

	/**
	 * Redirect to edit page
	 *
	 * @param id
	 */
	editUser(id) {
		this.router.navigate(['../users/edit', id], { relativeTo: this.activatedRoute });
	}
}
