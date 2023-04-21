import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmenHomeComponent } from './admen-home.component';

describe('AdmenHomeComponent', () => {
  let component: AdmenHomeComponent;
  let fixture: ComponentFixture<AdmenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmenHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
