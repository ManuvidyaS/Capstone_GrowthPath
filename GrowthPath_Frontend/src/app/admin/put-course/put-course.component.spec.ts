import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutCourseComponent } from './put-course.component';

describe('PutCourseComponent', () => {
  let component: PutCourseComponent;
  let fixture: ComponentFixture<PutCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
