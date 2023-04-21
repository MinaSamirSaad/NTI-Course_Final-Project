import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCartComponent } from './restaurant-cart.component';

describe('RestaurantCartComponent', () => {
  let component: RestaurantCartComponent;
  let fixture: ComponentFixture<RestaurantCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
