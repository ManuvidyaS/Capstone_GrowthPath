import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCourseComponent } from './recommend-course.component';

describe('RecommendCourseComponent', () => {
  let component: RecommendCourseComponent;
  let fixture: ComponentFixture<RecommendCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
