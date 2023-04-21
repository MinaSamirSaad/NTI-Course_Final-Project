import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRestaurantComponent } from './single-restaurant.component';

describe('SingleRestaurantComponent', () => {
  let component: SingleRestaurantComponent;
  let fixture: ComponentFixture<SingleRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
