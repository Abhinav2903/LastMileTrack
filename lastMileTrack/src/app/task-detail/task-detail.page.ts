import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserStoreServiceService } from '../service/user-store-service.service';
import { Storage } from '@ionic/storage-angular';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [UserStoreServiceService, Storage,File],
})
export class TaskDetailPage implements OnInit {
  startTime: number | undefined;
  endTime: number | undefined;
  elapsedTime: number | undefined;
  startLocation: string | undefined;
  endLocation: string | undefined;
  data: any;
  taskData: any = [];
  allData: any[] = [];
  showTask: any;
  showSpecificTask = false;

  constructor(
    private route: ActivatedRoute,
    private storeService: UserStoreServiceService
  ) {
    console.log('Constructior');
  }

  ngOnInit() {
    console.log('NGONINT');

    const taskData = history.state.taskData;
    const pageData = history.state.pageData;
    this.getTaskData(pageData, taskData);
  }

  getTaskData(pageData: any, taskData: any) {
    this.storeService.getAllData().then((data) => {
      // console.log(data);
      this.allData = data;
    });
    if (pageData == true) {
      console.log('TRUE PAGE DATA');
    } else {
      this.showTask = taskData.name;
      this.showSpecificTask = true;
    }
  }
}
