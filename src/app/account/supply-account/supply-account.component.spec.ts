import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyAccountComponent } from './supply-account.component';

describe('SupplyAccountComponent', () => {
  let component: SupplyAccountComponent;
  let fixture: ComponentFixture<SupplyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
