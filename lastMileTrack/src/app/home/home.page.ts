import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { StorageKeys } from '../constants/storageVariable.enum';
import { TaskDetailPage } from '../task-detail/task-detail.page';

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
  startTime= new Date();
  tasks: any[] = [];
  isVisible=false;
  isStopVisible=true;

  endTime!: Date;
  elapsedTime!: number;
  timerInterval: any;

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

  onClick(event: Event) {
    this.showToast('Timer Stopped!');
    event.stopPropagation();
  }

  onStop(event: Event,task: any) {
    this.showToast('Timer Stopped!');
    event.stopPropagation();
    // this.isStopVisible = false;
    // this.isVisible = true;
    task.isShowIcon = !task.isShowIcon;
    this.stopTimer();
  }

  onRestart(event: Event) {
    this.showToast('Timer Stopped!');
    event.stopPropagation();
  }

  onComplete(event: Event) {
    this.showToast('Task is Completed!');
    event.stopPropagation();
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

  addTask() {
    console.log(this.startTime);
    console.log(this.task, this.startTime);
    if (this.task == '') {
      this.daytaskCounter = this.daytaskCounter + 1;
      this.task = 'Task' + this.daytaskCounter;
    }
    this.tasks.push({
      task: this.task,
      startTime: moment(this.startTime, 'hh:mm A').toLocaleString(),
      isShowIcon: true,
    });
    this.showTaskForm = false;
    this.task = '';
    console.log(this.showTaskForm);
    this.startTimer()

  }

  //routing to the list page
  redirectToListData() {
    this.navCtrl.navigateForward('/task-detail');
  }


  
  startTimer() {
    this.startTime = new Date();
    this.timerInterval = setInterval(() => {
      this.calculateElapsedTime();
    }, 1000);
  }
  
  calculateElapsedTime() {
    this.endTime = new Date();
    this.elapsedTime = Math.round((this.endTime.getTime() - this.startTime.getTime()) / 1000);
    console.log(this.elapsedTime)
  }
  
  stopTimer() {
    clearInterval(this.timerInterval);
    this.calculateElapsedTime();
  }
  
  resetTimer() {
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
  }

  //use gps
  calculateStartLocation(){

  }

  // use gps
  calculateEndLocation(){

  }
}
