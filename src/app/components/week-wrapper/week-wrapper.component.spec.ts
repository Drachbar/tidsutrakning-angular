import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekWrapperComponent } from './week-wrapper.component';

describe('WeekWrapperComponent', () => {
  let component: WeekWrapperComponent;
  let fixture: ComponentFixture<WeekWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
