import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common/common.service';
import { DataService } from '../../shared/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss'
})
export class TasksFormComponent implements OnInit {

  public taskFormGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private commonService = inject(CommonService);
  private dataService = inject(DataService);
  private router = inject(Router);

  ngOnInit(): void {
    this.createTaskForm();
  }

  get people(): FormArray {
    return this.taskFormGroup.get('people') as FormArray;
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex)?.get('skills') as FormArray;
  }

  addPerson(): void {
    this.people.push(this.createPerson());
  }

  deletePerson(index: number): void {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.createSkill());
  }

  deleteSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex)?.removeAt(skillIndex);
  }

  handleCreateTask() {
    if(this.taskFormGroup.invalid){
      this.taskFormGroup.markAllAsTouched();
      return;
    }

    this.dataService.setData({...this.taskFormGroup.value, status: 'Pendiente'});
    this.router.navigate(['/tasks']);
  }

  public handleFormControlError(name: string) {
    const control = this.taskFormGroup.controls[name] as FormControl;
    return this.commonService.setFieldErrorText(control);
  }

  public handleFormArrayError(controlPath: (string | number)[]) {
    const control = this.taskFormGroup.get(controlPath) as FormControl;
    return this.commonService.setFieldErrorText(control);
  }

  private createTaskForm() {
    this.taskFormGroup = this.formBuilder.group({
      taskName: [null, [Validators.required]],
      taskDeadline: [null, [Validators.required]],
      people: this.formBuilder.array([], [Validators.required])
    });
  }


  private createPerson(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), this.commonService.setRepeatNameValidation.bind(this) ]],
      age: [null, [Validators.required,  this.commonService.setAgeValidation.bind(this)]],
      skills: this.formBuilder.array([], Validators.required)
    });
  }

  private createSkill(): FormGroup {
    return this.formBuilder.group({
      skill: [null, Validators.required]
    });
  }


}
