import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountComponent } from './service-account.component';

describe('ServiceAccountComponent', () => {
  let component: ServiceAccountComponent;
  let fixture: ComponentFixture<ServiceAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
