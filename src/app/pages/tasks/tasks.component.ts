import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  task = new FormControl<string>('', {nonNullable: true})

  tasks = signal<Task[]>([])

  completedTask = computed(()=>{
    const completedTasks = this.tasks().filter((task)=> task.isCompleted);
    return completedTasks;
  });

  uncompletedTask = computed(()=>{
    const completedTasks = this.tasks().filter((task)=> !task.isCompleted);
    return completedTasks;
  });

  constructor(){
    effect(()=>{
      if(this.uncompletedTask().length > 2){
        alert(`Tienes mas de ${this.uncompletedTask().length} sin coompletar`)
      }
    })
  }


  addTasks(){
    this.tasks.update(tasks =>
       [...tasks,{name: this.task.value, isCompleted: false  }]
       )
       this.task.setValue('');
      }
    
  deleteTask(task: Task){
    this.tasks.update((tasks)=> tasks.filter((t) => t.name !== task.name ))
  }

  toggleCompletedTask(task: Task){
    this.tasks.mutate((tasks)=>{
      const taskUpdated = this.tasks().find((t)=> t.name === task.name);
      if(taskUpdated) taskUpdated.isCompleted = !taskUpdated.isCompleted;
      return tasks
    })
  }

  resetTask(){
    this.tasks.set([])
  }
}
