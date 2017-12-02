import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioOverviewComponent } from './studio-overview.component';

describe('StudioOverviewComponent', () => {
  let component: StudioOverviewComponent;
  let fixture: ComponentFixture<StudioOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
