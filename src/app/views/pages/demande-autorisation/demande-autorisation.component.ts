import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'kt-demande-autorisation',
  templateUrl: './demande-autorisation.component.html',
  styleUrls: ['./demande-autorisation.component.scss']
})
export class DemandeAutorisationComponent implements OnInit {
	@ViewChild('content') content: ElementRef;
  constructor() { }

  ngOnInit() {
  	let data = document.getElementById('content');
 /* 	let doc = new jsPDF();
  	let specialElementHandlers = {
  		'#editor': function(element,renderer) {
			return true;
		}
	};
  	let content = this.content.nativeElement;
  	doc.addFont('Amiri.ttf','amiri','normal');
  	doc.setFont('amiri');
  	doc.fromHTML(content.innerHTML,15,15,{
  		'width': 190,
		'elementHandlers': specialElementHandlers
	});
  	doc.save('test.pdf');*/
	  /*	// @ts-ignore
			html2canvas(data).then(canvas =>{
			  let imgWidth = 200;
			  let pageWeight = 295;
			  let imgHeight = canvas.height * imgWidth / canvas.width;
			  let heightLeft = imgHeight;
			  const contentDataURL = canvas.toDataURL('image/png');
			  let pdf = new jspdf('p','mm', 'a4');
			  let position = 0;
			  pdf.addImage(contentDataURL,'PNG', 0, position, imgWidth, imgHeight);
			  pdf.save('file.pdf');
		  });
		  const options = {
			  filename: 'hhh.pdf',
			  image: {type: 'jpeg'},
			  html2canvas: {},
			  jsPDF: {orientation: 'portrait'}
		  };
		  const content: Element = document.getElementById('content');
		  html2pdf()
			  .from(content)
			  .set(options)
			  .save();
			let element = document.getElementById('content');*/
			/*let options = {
				margin: 0,
				filename: 'myfile.pdf',
				html2canvas: {scale: 1},
				jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait',compressPDF: true}
			};
			html2pdf().from(element).set({
				filename: 'myfile.pdf',
				html2canvas: {scale: 1},
				jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait',compressPDF: true}
			}).save();*/


  }

}
