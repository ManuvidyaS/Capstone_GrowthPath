import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCourseByIdComponent } from './get-course-by-id.component';

describe('GetCourseByIdComponent', () => {
  let component: GetCourseByIdComponent;
  let fixture: ComponentFixture<GetCourseByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCourseByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCourseByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
