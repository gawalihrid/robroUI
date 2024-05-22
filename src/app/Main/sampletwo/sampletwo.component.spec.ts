import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletwoComponent } from './sampletwo.component';

describe('SampletwoComponent', () => {
  let component: SampletwoComponent;
  let fixture: ComponentFixture<SampletwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampletwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampletwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
