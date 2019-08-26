import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDocComponent } from './categorie-doc.component';

describe('CategorieDocComponent', () => {
  let component: CategorieDocComponent;
  let fixture: ComponentFixture<CategorieDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
