import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Surface} from "../../../core/models/surface";

@Component({
  selector: 'kt-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent implements OnInit {
	surfaceForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private _formBuilder: FormBuilder) { }
	surface: Surface = new Surface();
  ngOnInit() {
	  this.surfaceForm = this._formBuilder.group({
		  sur_terrain: ['', Validators.required],
		  sur_batie: ['', Validators.required],
		  sur_plancher: ['', Validators.required],
		  cus: ['', Validators.required],
		  cos: ['', Validators.required],
		  long: ['', Validators.required],
		  lat: ['', Validators.required]
	  });
  }

	save() {
  		this.surface.cos = this.surfaceForm.get('cos').value;
		this.surface.cus = this.surfaceForm.get('cus').value;
		this.surface.surfaceBatie = this.surfaceForm.get('sur_batie').value;
		this.surface.surfacePlancher = this.surfaceForm.get('sur_plancher').value;
		this.surface.surfaceTerrain = this.surfaceForm.get('sur_terrain').value;
		this.surface.x = this.surfaceForm.get('long').value;
		this.surface.y = this.surfaceForm.get('lat').value;
		this.activeModal.close(this.surface);
	}
}
