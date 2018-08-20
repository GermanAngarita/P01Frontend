import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyConfiComponent } from './supply-confi.component';

describe('SupplyConfiComponent', () => {
  let component: SupplyConfiComponent;
  let fixture: ComponentFixture<SupplyConfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyConfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
