import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { taskListRecord } from '../constants/taskList.enum';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage {
  showTaskForm: boolean | undefined;
  task: string = '';
  startTime: any;
  tasks: any[] = [];
  isVisible = false;
  isStopVisible = true;
  taskListRecord = Object.values(taskListRecord);
  // orderedTaskList = Object.values(taskListRecord).sort((a, b) => a.name.localeCompare(b.name));
  endTime!: Date;
  elapsedTime!: number;
  timerInterval: any;
  pausedTime!: number;
  pausedTasks: any[] = [];
  prevTask: any;

  // storageVariable
  daytaskCounter = 0; // can be incremented regularly by stroing in the storage
  newDay: string | undefined; // can be ommited

  @ViewChild('myForm', { static: false })
  myForm!: ElementRef<HTMLFormElement>;

  submitForm() {
    this.myForm.nativeElement.submit();
  }

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  // onStop(event: Event, task: any) {
  //   this.stopTimer(task,event,  'Timer Stopped!');

  //   // this.previousTaskAssign(task, event);
  //   // this.showToast('Timer Stopped!');
  // }

  onPause(event: Event, task: any) {
    this.stopTimer(task, event, 'Timer Paused!');

    // Store the paused task and its pausedTime value
    const pausedTask = this.pausedTasks.find((t) => t.task === task);
    if (pausedTask) {
      pausedTask.pausedTime = this.elapsedTime;
    } else {
      this.pausedTasks.push({ task, pausedTime: this.elapsedTime });
    }
  }

  // function call on the resume button call
  onResume(event: Event, task: any) {
    this.showToast('Timer Resumed!');
    // task.isShowIcon = !task.isShowIcon;
    console.log('elapsed Time', this.elapsedTime);

    // Retrieve the pausedTime value for the resumed task
    const pausedTask = this.pausedTasks.find((t) => t.task === task);
    const pausedTime = pausedTask ? pausedTask.pausedTime : 0;

    console.log('Paused Time', pausedTime);
    // this.startTimer(task, event,pausedTime);
    // still remaining the code for if a new task timer is clicked stop the previous timer save it and start new
    this.previousTaskAssign(task, event, pausedTime);
    event.stopPropagation();
  }

  // function on complete button stops the timer after task completion
  onComplete(event: Event, task: any) {
    this.stopTimer( task,event, 'Task is Completed!',true);

    // this.previousTaskAssign(task, event);
    // this.showToast('Task is Completed!');
    // save the time in the storage
  }

  showToast(msg: any) {
    this.toastController
      .create({
        message: msg,
        duration: 1500,
        position: 'bottom',
      })
      .then((toast) => toast.present());
  }

  showForm() {
    this.showTaskForm = true;
  }

  //function call on start button
  onStart(event: Event, task: any) {
    // task.isShowIcon = !task.isShowIcon;
    // this.startTimer(task,event);
    // still remaining the code for if a new task timer is clicked stop the previous timer save it and start new
    this.previousTaskAssign(task, event);
    event.stopPropagation();
  }

  //routing to the list page
  redirectToListData() {
    this.navCtrl.navigateForward('/task-detail');
  }

  //start the timer according to the pausedtime or from start
  startTimer(task: any, event: Event, pausedTime: number = 0) {
    task.isShowIcon = !task.isShowIcon;
    this.startTime = new Date().getTime() - pausedTime * 1000;
    this.timerInterval = setInterval(() => {
      this.calculateElapsedTime();
      task.timer = this.elapsedTime;
    }, 1000);

    // still remaining the code for if a new task timer is clicked stop the previous timer save it and start new
    // this.previousTaskAssign(task,event);
  }

  previousTaskAssign(
    task: {
      isShowIcon: boolean;
      name: string;
    },
    event: Event,
    pausedTime: number = 0
  ) {
    
    console.log('task' + task.name);
    console.log(task.name == this.prevTask);
    if (typeof this.prevTask === 'undefined'||this.prevTask == 'newTask') {
      this.prevTask = task;
      this.startTimer(task, event, pausedTime);
    } else {
      if (this.prevTask.name != task.name) {
        console.log('Prev Task' + this.prevTask.name);
        console.log("Prev Task icon"+ this.prevTask.isShowIcon)
        // if(this.prevTask.isShowIcon != true){
          // this.prevTask.isShowIcon = !this.prevTask.isShowIcon
        // }
        this.stopTimer(this.prevTask, event, 'New Task Started');
        this.prevTask = task;
        this.startTimer(task, event, pausedTime);
      } else {
        this.prevTask = task;
        this.startTimer(task, event, pausedTime);
      }
    }
  }
  // calculate the time elapsed
  calculateElapsedTime() {
    const endTime = new Date();
    this.elapsedTime = Math.round((endTime.getTime() - this.startTime) / 1000);
    console.log(this.elapsedTime);
  }

  // stop timer
  stopTimer(task: any, event: Event, toast?: string,direct?:boolean) {
    console.log('TASK STOP', task);
    console.log("Task icon",task.isShowIcon)
    task.isShowIcon = !task.isShowIcon;
    event.stopPropagation();
    clearInterval(this.timerInterval);
    this.calculateElapsedTime();
    if (toast) {
      this.showToast(toast);
    }
    if(direct){
      this.prevTask = 'newTask';
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
  }

  //use gps
  calculateStartLocation() {}

  // use gps
  calculateEndLocation() {}
}
