import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { StorageKeys } from '../constants/storageVariable.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage {
  showTaskForm: boolean | undefined;
  task: string = "";
  startTime: string = new Date().toISOString();
  tasks: any[] = [];


  // storageVariable
  daytaskCounter = 0; // can be incremented regularly by stroing in the storage
  newDay:string| undefined;// can be ommited

  @ViewChild('myForm', { static: false })
  myForm!: ElementRef<HTMLFormElement>;
  
  
  submitForm() {
    this.myForm.nativeElement.submit();
  }

  constructor(private toastController: ToastController) {}

  async onClick() {
    const toast = await this.toastController.create({
      message: 'Timer Stoped',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  showForm() {
    this.showTaskForm = true;
  }

  addTask() {
    console.log(this.startTime);
    console.log(this.task, this.startTime);
    if(this.task==""){
      this.daytaskCounter = this.daytaskCounter+1;
      this.task = "Task"+this.daytaskCounter

    }
    this.tasks.push({
      task: this.task,
      startTime: moment(this.startTime, 'hh:mm A').toLocaleString(),
    });
    this.showTaskForm = false;
    this.task = '';
    console.log(this.showTaskForm)
  }

  //routing to the list page
  async redirectToListData(){
    const toast = await this.toastController.create({
      message: 'Redirection',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
