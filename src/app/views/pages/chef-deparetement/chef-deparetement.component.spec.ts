import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDeparetementComponent } from './chef-deparetement.component';

describe('ChefDeparetementComponent', () => {
  let component: ChefDeparetementComponent;
  let fixture: ComponentFixture<ChefDeparetementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefDeparetementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefDeparetementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
