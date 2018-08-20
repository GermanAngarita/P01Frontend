import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConfiComponent } from './service-confi.component';

describe('ServiceConfiComponent', () => {
  let component: ServiceConfiComponent;
  let fixture: ComponentFixture<ServiceConfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceConfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
