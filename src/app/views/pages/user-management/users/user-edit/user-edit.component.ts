import { userService } from './../../../../../services/user.service';
import { PasswordValidation } from './../_subs/change-password/change-password.component';
import { Role } from './../../../../../core/auth/_models/role.model';
// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
// Services and Models
import {
	Address,
	SocialNetworks,
} from '../../../../../core/auth';
import {User} from '../../../../../classes/user';
import { ValidateEmailNotTaken } from '../../../../../classes/validateEmailNotTaken';
import { map, filter } from 'rxjs/operators';
import { longStackSupport } from 'q';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
	// Public properties
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	userForm: FormGroup;
	hasFormErrors: boolean = false;
	//
	edit: boolean = true;
	roles = [ {value:"ROLE_ADMIN",viewValue:"ADMIN"},
	          {value:"ROLE_DIRECTEUR",viewValue:"DIRECTEUR"},
			  {value:"ROLE_CHEF_DEP",viewValue:"CHEF DE DEPARTEMENT"},
			  {value:"ROLE_CHEF_SRV",viewValue:"CHEF DE SERVICE"}
	];

	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private userFB: FormBuilder,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService,
		private _userService: userService) { }

	
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */
	/**
	 * On init
	 */
	ngOnInit() {
		this.reset();
		this.activatedRoute.paramMap.subscribe(params=>
			{
				const id = +params.get('id');
				if (id) {
					this.getUserById(id);
			    } else {
					//this.edit = true;
					this.user = new User();
					this.oldUser = Object.assign({}, this.user);
					this.initUser();
			}
			});
	}

	ngOnDestroy() {
	}

	/**
	 * Init user
	 */
	initUser() {
		this.createForm();
		if (!this.user.id) {
			this.subheaderService.setTitle('Ajouter un utilisateur');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Gestion des utilisateurs', page: `user-management` },
				{ title: 'Utilisateurs',  page: `user-management/users` },
				{ title: 'Ajouter un utilisateur', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Modifier un utilisateur');
		this.subheaderService.setBreadcrumbs([
			{ title: 'Gestion des utilisateurs', page: `user-management` },
			{ title: 'Utilisateurs',  page: `user-management/users` },
			{ title: 'Modifier un utilisateur', page: `user-management/users/edit`, queryParams: { id: this.user.id } }
		]);
	}
	
	/**
	 * @param id
	 */
	getUserById(id: number)
	{
		this._userService.getUserById(id).subscribe(
			(Iuser: User) => this.updateUser(Iuser),
			(err:any)=>console.log(err)
		);
		
	}



	/**
	 * Create form
	 */
	createForm() {
		this.userForm = this.userFB.group({
			username:['', Validators.required, this.validateUsernameNotTaken.bind(this)],
			nom: [this.user.nom],
			prenom: [this.user.prenom],
			email: [this.user.email, Validators.email, this.validateEmailNotTaken.bind(this)],
			password: [this.user.password, [Validators.required, PasswordValidation, Validators.minLength(8)]],
			role: [this.user.role, Validators.required],
		});
	}
	
	validateUsernameNotTaken(control: AbstractControl) {
		return this._userService.checkUsernameNotTaken(control.value).pipe(map(res => {
			this.activatedRoute.paramMap.subscribe(params=>
				{
					this.user.id = +params.get('id');
				})
		  return ((res==null) || (this.user.id!=0)) ? null : { usernameTaken: true };
		}));
	  }
	validateEmailNotTaken(control: AbstractControl) {
		return this._userService.checkEmailNotTaken(control.value).pipe(map(res => {
			console.log(res);
			this.activatedRoute.paramMap.subscribe(params=>
				{
					this.user.id = +params.get('id');
				})
		  return ((res==false) || (this.user.id!=0)) ? null : { emailTaken: true };
		}));
	  }

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		setTimeout(() => {
			this.router.navigate(['../users']).then(() => {
				window.location.reload();
			  });					
		}, 5000);  //5s
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();
		this.activatedRoute.paramMap.subscribe(params=>
			{
				const id = +params.get('id');
				if (id > 0) {
					editedUser.id = id;
					this._userService.updateUser(editedUser).subscribe(response => {
						if(response){
							const _modMessage = "L'utilisateur a été modifié avec succès";
							this.layoutUtilsService.showActionNotification(_modMessage, MessageType.Update);
							this.goBackWithId();
						   }
						;	
					});
			     	return;
				}
				else{
					this.addUser(editedUser);
				}
		});
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		const controls = this.userForm.controls;
		const _user = new User();
		_user.id = this.user.id;
		_user.nom = controls['nom'].value;
		_user.prenom = controls['prenom'].value;
		_user.username = controls['username'].value;
		_user.email = controls['email'].value;
		_user.password = controls['password'].value;
		_user.role = controls['role'].value;
		return _user;
	}

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User) {
		this._userService.addUser(_user)
		.subscribe
		(
			data=>
			{
				if(data){
					const _addMessage = "L'utilisateur a été ajouté avec succès";
					this.layoutUtilsService.showActionNotification(_addMessage, MessageType.Create);
					this.goBackWithId();
				   }
				;	
			},
	
		);
	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 */
	updateUser(_user: User) {
        this.userForm.patchValue(
			{
				nom: _user.nom,
				prenom: _user.prenom,
				username: _user.username,
				email: _user.email,
				password: _user.password,
				role: _user.role
			}
		)
	}
	getComponentTitle(){
	}

	/** 
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
