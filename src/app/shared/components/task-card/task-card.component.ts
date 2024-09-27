import { Component, Input, inject } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task: Task;
  private dataService = inject(DataService);

  handleChecked(event: Event){
    const checkbox = event.target as HTMLInputElement
    const checked = checkbox.checked;
    this.task.status = checked ? 'Completada' : 'Pendiente';
    this.dataService.updateData(this.task);
  }
}
