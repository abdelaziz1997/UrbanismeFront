import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurComponent } from './directeur.component';

describe('DirecteurComponent', () => {
  let component: DirecteurComponent;
  let fixture: ComponentFixture<DirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirecteurComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
