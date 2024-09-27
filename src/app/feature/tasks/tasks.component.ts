import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { Router } from '@angular/router';
import { Task } from '../../shared/interfaces/task.interface';
import { Subscription, delay, finalize, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';

@Component({
  selector: 'app-taskssss',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy{

  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public selectedFilter: string = 'todas';
  private taskSubscription : Subscription;
  private dataService = inject(DataService);
  private router = inject(Router);
  private ngxSpinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    
    this.taskSubscription =  this.dataService.data$.pipe(
      tap(()=> this.ngxSpinnerService.show()),
      delay(3000),
    ).subscribe({
      next:(tasks)=>{
        this.ngxSpinnerService.hide();
        this.filteredTasks = tasks;
        this.handleFilterTasks(this.selectedFilter);
      }
    });
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }

  handleGoToTaskForm(){
    this.router.navigate(['/tasks-form']);
  }

  handleFilterTasks(filter: string) {
    this.selectedFilter = filter;
    this.tasks = this.setTasks(filter);
  }

  setTasks(filter: string){ 
    if (filter === 'completadas') {
      return this.filteredTasks.filter(task => task.status === 'Completada');
    } 

    if (filter === 'pendientes') {
      return this.filteredTasks.filter(task => task.status === 'Pendiente');
    }

    
    return this.filteredTasks;
  }



}
