import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupId, taskListRecord } from '../constants/taskList.enum';
import { UserStoreServiceService } from '../service/user-store-service.service';
import { Storage } from '@ionic/storage-angular';
import { NavigationExtras, Router } from '@angular/router';
import { LocationtrackerService } from '../service/locationtracker.service';
import { File } from '@ionic-native/file/ngx';
import { Task } from '../constants/taskInterface';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  providers: [UserStoreServiceService, Storage,File],
  
})
export class HomePage {
  showTaskForm: boolean | undefined;
  task: string = '';
  startTime: any;
  tasks: any[] = [];
  isVisible = false;
  isStopVisible = true;
  taskRecord = Object.values(taskListRecord);
  // orderedTaskList = Object.values(taskListRecord).sort((a, b) => a.name.localeCompare(b.name));
  endTime!: Date;
  elapsedTime!: number;
  timerInterval: any;
  pausedTime!: number;
  pausedTasks: any[] = [];
  prevTask: any;
  selectedGroupId: GroupId = GroupId.Group1;
  GroupId: any;
  // storageVariable
  daytaskCounter = 0; // can be incremented regularly by stroing in the storage
  newDay: string | undefined; // can be ommited

  // taskListRecord: any[] = []; // Your task list array

  groupedTasks: { groupID: string, tasks: any[] }[] = [];

  @ViewChild('myForm', { static: false })
  myForm!: ElementRef<HTMLFormElement>;
  onPauseCheck: boolean | undefined;

  submitForm() {
    this.myForm.nativeElement.submit();
  }

  constructor(
    private toastController: ToastController,
    private storeService: UserStoreServiceService,
    private router: Router,
    private locationService: LocationtrackerService
  ) { this.groupTasksByGroupID();}


  groupTasksByGroupID() {
    const groups = new Map<string, any[]>();
  
    for (const task of this.taskRecord) {
      const groupID = task.groupId;
      const groupTasks = groups.get(groupID);
      if (groupTasks) {
        groupTasks.push(task);
      } else {
        groups.set(groupID, [task]);
      }
    }
  
    this.groupedTasks = Array.from(groups).map(([groupID, tasks]) => ({
      groupID,
      tasks,
    }));
  }

  onPause(event: Event, task: any) {
    this.stopTimer(task, event, 'Timer Paused!');
    this.onPauseCheck = true;
    // Store the paused task and its pausedTime value
    const pausedTask = this.pausedTasks.find((t) => t.task === task);
    if (pausedTask) {
      //console.log("in if");
      pausedTask.pausedTime = this.elapsedTime;
    } else {
      //console.log("in else");
      this.pausedTasks.push({ task, pausedTime: this.elapsedTime });
    }
  }

  // function call on the resume button call
  onResume(event: Event, task: any) {
    this.showToast('Timer Resumed!');
    // task.isShowIcon = !task.isShowIcon;
    //console.log('elapsed Time', this.elapsedTime);

    // Retrieve the pausedTime value for the resumed task
    const pausedTask = this.pausedTasks.find((t) => t.task === task);
    const pausedTime = pausedTask ? pausedTask.pausedTime : 0;
    //console.log("paused task",pausedTask)
    //console.log('Paused Time', pausedTime);
    // this.startTimer(task, event,pausedTime);
    // still remaining the code for if a new task timer is clicked stop the previous timer save it and start new
    this.previousTaskAssign(task, event, pausedTime);
    event.stopPropagation();
  }

  // function on complete button stops the timer after task completion
  onComplete(event: Event, task: any) {
    this.stopTimer(task, event, 'Task is Completed!', true);
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
  redirectToListData(completeData?: boolean, task?: any) {
    // Pass data to the TaskDetailPage
    //console.log(completeData, task);
    const navigationExtras: NavigationExtras = {
      state: {
        taskData: task,
        pageData: completeData,
      },
    };

    this.router.navigate(['/task-detail'], navigationExtras);
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

  async previousTaskAssign(
    task: {
      startLocation: any;
      isShowIcon: boolean;
      name: string;
    },
    event: Event,
    pausedTime: number = 0
  ) {
    //console.log('task' + task.name);
    //console.log('check prev task',task.name === this.prevTask);
    // if previously there is no task then start new task
    if (typeof this.prevTask === 'undefined' || this.prevTask === 'newTask') {
      this.prevTask = task;
      this.startTimer(task, event, pausedTime);
      const location = await this.getCurrentLocation();
      this.assignStartLocation(task, location);
    } else {
      // check the previous task name if not same then strat new time for that task
      if (this.prevTask.name != task.name) {
        //console.log('Prev Task' + this.prevTask.name);
        //console.log('Prev Task icon' + this.prevTask.isShowIcon);
        // if(this.prevTask.isShowIcon != true){
        // this.prevTask.isShowIcon = !this.prevTask.isShowIcon
        // }
        this.stopTimer(this.prevTask, event, 'New Task Started');
        this.prevTask = task;
        this.startTimer(task, event, pausedTime);
        const location = await this.getCurrentLocation();
        this.assignStartLocation(task, location);
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
    //console.log(this.elapsedTime);
  }

  // stop timer
  async stopTimer(task: any, event: Event, toast?: string, direct?: boolean) {
    //console.log('TASK STOP', task);
    //console.log('Task icon', task.isShowIcon);
    if(toast === "New Task Started" && this.onPauseCheck == true){
      task.isShowIcon = task.isShowIcon;
    }else{
      task.isShowIcon = !task.isShowIcon;
    }
    event.stopPropagation();
    clearInterval(this.timerInterval);
    this.calculateElapsedTime();
    const dateKey = this.createDateKey();

    if (toast) {
      this.showToast(toast);
    }
    if (
      direct ||
      toast == 'Task is Completed!' ||
      toast === 'New Task Started'
    ) {
      this.prevTask = 'newTask';
      // this.calculateEndLocation(task)
      const location = await this.getCurrentLocation();
      this.assignEndLocation(task, location);
      this.storeService.getValue(dateKey).then((val) => {
        //console.log('Key value retrived', val);
        //console.log(typeof val);
        if (val != null) {
          val.push(task);
          this.storeService.setValue(dateKey, val);
        } else {
          this.storeService.setValue(dateKey, [task]);
        }
      });
    }
  }

  createDateKey() {
    const currentDate = new Date();
    return currentDate
      .toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, '');
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
  }

  assignStartLocation(task: any, location: any) {
    task.startLat = location.latitude;
    task.startLon = location.longitude;
  }

  assignEndLocation(task: any, location: any) {
    task.endLat = location.latitude;
    task.endLon = location.longitude;
  }

  async getCurrentLocation() {
    const locationCord = await this.locationService.checkPermission();
    if (locationCord == 0) {
      this.showToast(
        'Location Service Not available,please update the permisions'
      );
      return 0.0;
    } else {
      return locationCord;
    }
  }

  exportToCSV(){
    //call export to csv function
    this.storeService.exportToCSV();
  }

  getFilteredTasksByGroup(selectedGroupId: GroupId): Task[] {
    return Object.values(taskListRecord)
    .filter((task) => task.groupId === selectedGroupId);
  }
}
