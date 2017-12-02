import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioCoursesComponent } from './studio-courses.component';

describe('StudioCoursesComponent', () => {
  let component: StudioCoursesComponent;
  let fixture: ComponentFixture<StudioCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
