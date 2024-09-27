import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskssssComponent } from './tasks.component';

describe('TaskssssComponent', () => {
  let component: TaskssssComponent;
  let fixture: ComponentFixture<TaskssssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskssssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskssssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
