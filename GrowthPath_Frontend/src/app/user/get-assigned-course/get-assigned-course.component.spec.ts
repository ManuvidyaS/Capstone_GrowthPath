import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAssignedCourseComponent } from './get-assigned-course.component';

describe('GetAssignedCourseComponent', () => {
  let component: GetAssignedCourseComponent;
  let fixture: ComponentFixture<GetAssignedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAssignedCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAssignedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
