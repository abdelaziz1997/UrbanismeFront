import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDossierComponent } from './creation-dossier.component';

describe('CreationDossierComponent', () => {
  let component: CreationDossierComponent;
  let fixture: ComponentFixture<CreationDossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationDossierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
