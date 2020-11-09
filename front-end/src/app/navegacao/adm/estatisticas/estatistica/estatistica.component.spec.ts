import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticaComponent } from './estatistica.component';

describe('EstatisticaComponent', () => {
  let component: EstatisticaComponent;
  let fixture: ComponentFixture<EstatisticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
