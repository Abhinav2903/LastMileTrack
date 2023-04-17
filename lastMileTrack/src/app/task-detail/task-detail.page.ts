import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskDetailPage implements OnInit {
  startTime: number | undefined;
  endTime: number | undefined;
  elapsedTime: number | undefined;
  startLocation: string | undefined;
  endLocation: string | undefined;
  data: any;
  taskData: any=[];

  constructor() { 
    console.log("Constructior");
  }

  ngOnInit() {
    console.log("NGONINT")
    this.getTaskData();
  }

  getTaskData(){
    this.taskData.startTime = 0;
    this.taskData.endTime = 10;
    this.taskData.elapsedTime = 10;
    this.taskData.startLocation = "77.25,78.66";
    this.taskData.endLocation ="77.27,78.67";

    this.taskData.push({
      startTime: this.taskData.startTime,
      endTime: this.taskData.endTime,
      elapsedTime: this.taskData.elapsedTime,
      startLocation: this.taskData.startLocation,
      endLocation: this.taskData.endLocation
    });
    
  }



}
