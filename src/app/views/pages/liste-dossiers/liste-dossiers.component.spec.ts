import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDossiersComponent } from './liste-dossiers.component';

describe('ListeDossiersComponent', () => {
  let component: ListeDossiersComponent;
  let fixture: ComponentFixture<ListeDossiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDossiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDossiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
