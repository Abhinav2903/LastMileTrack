export interface Task {
  name: string;
  isShowIcon: boolean;
  timer: number;
  startLat:number;
  startLon:number;
  endLat:number;
  endLon:number;
}

export enum TaskList {
  Task1 = 'Fahren zum nachsten Stopp',
  Task2 = 'Fahrzeug verlassen',
  Task3 = 'Fahrzeug aufstandern',
  Task4 = 'Fahrzeug schieben',
  Task5 = 'Zum Sendungsbehalter laufen',
  Task6 = 'Zum Hauseingang laufen',
  Task7 = 'Entnehmen',
  Task8 = 'Sendungen sortieren',
  Task9 = 'Hauseingang betreten',
  Task10 = 'Hauseingang verlassen',
  Task11 = 'Sendung zustellen',
  Task12 = 'Am Hauseingang warten',
  Task13 = 'Hauseingang betreten',
  Task14 = 'Hauseingang verlassen',
  Task15 = 'Handheld bedienen',
  Task16 = 'Auf Fahrzeug steigen',
  Task17 = 'Zum Fahrzeug laufen',
  Task18 = 'Sendungen zurucklegen',
}

export const taskListRecord: Record<TaskList, Task> = {
  [TaskList.Task1]: { name: TaskList.Task1, isShowIcon: true, timer: 0 ,startLat:0,startLon:0,endLat:0,endLon:0},
  [TaskList.Task2]: { name: TaskList.Task2, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task3]: { name: TaskList.Task3, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task4]: { name: TaskList.Task4, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task5]: { name: TaskList.Task5, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task6]: { name: TaskList.Task6, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task7]: { name: TaskList.Task7, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task8]: { name: TaskList.Task8, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task9]: { name: TaskList.Task9, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task10]: { name: TaskList.Task10, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task11]: { name: TaskList.Task11, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task12]: { name: TaskList.Task12, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task13]: { name: TaskList.Task13, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task14]: { name: TaskList.Task14, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task15]: { name: TaskList.Task15, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task16]: { name: TaskList.Task16, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task17]: { name: TaskList.Task17, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 },
  [TaskList.Task18]: { name: TaskList.Task18, isShowIcon: true, timer: 0, startLat:0,startLon:0,endLat:0,endLon:0 }
};

