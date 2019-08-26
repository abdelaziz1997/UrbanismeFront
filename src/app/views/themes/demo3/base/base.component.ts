// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// RxJS
import { Subscription, Observable } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuConfigService, PageConfigService } from '../../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../../core/_config/demo3/layout.config';
import { MenuConfig } from '../../../../core/_config/demo3/menu.config';
import { PageConfig } from '../../../../core/_config/demo3/page.config';
// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { Permission, currentUserPermissions } from '../../../../core/auth';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import {TokenStorageService} from "../../../../core/auth/token-storage.service";

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
	// Public constructor
	selfLayout: string;
	asideDisplay: boolean;
	asideSecondary: boolean;
	subheaderDisplay: boolean;

	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	private currentUserPermissions$: Observable<Permission[]>;
	private roles: string[];


	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param menuConfigService: MenuConfifService
	 * @param pageConfigService: PageConfigService
	 * @param htmlClassService: HtmlClassService
	 * @param tokenStorage
	 * @param store
	 * @param permissionsService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private pageConfigService: PageConfigService,
		private htmlClassService: HtmlClassService,
		private tokenStorage: TokenStorageService,
		private store: Store<AppState>,
		private permissionsService: NgxPermissionsService) {
		this.loadRolesWithPermissions();
		this.roles = this.tokenStorage.getAuthorities();
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);
		// register configs by demos
		const _layoutConfig = new LayoutConfig().configs;
		if (this.roles[0] === 'ROLE_ADMIN') {
			this.menuConfigService.loadConfigs(new MenuConfig().admin);
		} else if (this.roles[0] === 'ROLE_DIRECTEUR') {
			this.menuConfigService.loadConfigs(new MenuConfig().directeur);
		} else if (this.roles[0] === 'ROLE_CHEF_DEP') {
			this.menuConfigService.loadConfigs(new MenuConfig().chef_dep);
		} else if (this.roles[0] === 'ROLE_CHEF_SRV') {
			this.menuConfigService.loadConfigs(new MenuConfig().chef_srv);
		}


		// setup element classes
		const _layoutServiceConfig = this.layoutConfigService.getConfig();

		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const layoutSubdscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubdscription);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.asideSecondary = objectPath.get(config, 'aside-secondary.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');

		// let the layout type change
		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(layoutConfigSubscription);
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/**
	 * NGX Permissions, init roles
	 */
	loadRolesWithPermissions() {
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		const subscr = this.currentUserPermissions$.subscribe(res => {
			if (!res || res.length === 0) {
				return;
			}

			this.permissionsService.flushPermissions();
			res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
		});
		this.unsubscribe.push(subscr);
	}
}