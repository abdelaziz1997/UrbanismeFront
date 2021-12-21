import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { InfoSys } from '../models/info-sys';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private _service: ModelService) { }

  public saveSysInfo(element: InfoSys): Observable<any> {
		return this._service.createRessources('/system/saveInfo',element);
	}
}
