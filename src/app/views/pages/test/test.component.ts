import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
declare const google: any;
@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	pdfSrc: string = './assets/media/doc.pdf';
	@Input() name;
	center: any = {
		lat: 33.5362475,
		lng: -111.9267386
	};
	constructor() { }

	ngOnInit() {
	}
	onMapReady(map) {
		this.initDrawingManager(map);
	}

	initDrawingManager(map: any) {
		const options = {
			drawingControl: true,
			drawingControlOptions: {
				drawingModes: ['polygon']
			},
			polygonOptions: {
				draggable: true,
				editable: true
			},
			drawingMode: google.maps.drawing.OverlayType.POLYGON
		};

		const drawingManager = new google.maps.drawing.DrawingManager(options);
		drawingManager.setMap(map);
	}


}
