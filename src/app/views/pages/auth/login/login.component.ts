// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService,AuthService ,Login } from '../../../../core/auth';
import {AuthLoginInfo} from '../../../../core/auth/login-info';
import {TokenStorageService} from '../../../../core/auth/token-storage.service';
import {LayoutConfigService, MenuConfigService} from '../../../../core/_base/layout';
import {MenuConfig} from '../../../../core/_config/demo3/menu.config';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	USERNAME: '',
	PASSWORD: ''
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	loginInfo: AuthLoginInfo;
	unsubscribe: Subject<any>;
	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];
	returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 * @param tokenStorage
	 * @param menuConfigService
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private tokenStorage: TokenStorageService,
		private menuConfigService: MenuConfigService
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Entrez votre nom d'utilisateur et le mot de passe`;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}

		this.loginForm = this.fb.group({
			username: [DEMO_PARAMS.USERNAME, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-username-address
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			username: controls['username'].value,
			password: controls['password'].value
		};
		this.loginInfo = new AuthLoginInfo(
			authData.username,
			authData.password);
		this.auth
			.login(this.loginInfo)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({authToken: user.accessToken}));
						this.tokenStorage.saveToken(user.accessToken);
						this.tokenStorage.saveUsername(user.username);
						this.tokenStorage.saveAuthorities(user.authorities);

						this.isLoginFailed = false;
						this.isLoggedIn = true;
						this.loading = false;
						this.roles = this.tokenStorage.getAuthorities();
						// this.router.navigate(['/']);
						if (this.roles[0] === 'ROLE_ADMIN') {
							this.menuConfigService.loadConfigs(new MenuConfig().admin);
							this.router.navigate(['/admin']);
						} else if (this.roles[0] === 'ROLE_DIRECTEUR') {
							this.menuConfigService.loadConfigs(new MenuConfig().directeur);
							this.router.navigate(['/directeur']);
						} else if (this.roles[0] === 'ROLE_CHEF_DEP') {
							this.router.navigate(['/chefDepartement']);
						} else if (this.roles[0] === 'ROLE_CHEF_SRV') {
							this.router.navigate(['/chefService']);
						} else {
							this.router.navigateByUrl('/error/403');
						}
						 // this.router.navigateByUrl(this.returnUrl); // Main page
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
						console.log('error');
						this.isLoginFailed = true;
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	/*	this.auth.attemptAuth(this.loginInfo).subscribe(
			data => {
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveUsername(data.username);
				this.tokenStorage.saveAuthorities(data.authorities);

				this.isLoginFailed = false;
				this.isLoggedIn = true;
				this.loading = false;
				this.roles = this.tokenStorage.getAuthorities();
				this.router.navigateByUrl(this.returnUrl); // Main page
			},
			error => {
				console.log(error);
				this.errorMessage = error.error.message;
				this.isLoginFailed = true;
			}
		);*/
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
