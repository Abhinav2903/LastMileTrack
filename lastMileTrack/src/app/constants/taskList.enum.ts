export interface Task {
  name: string;
  isShowIcon: boolean;
  timer: number;
}

export enum TaskList {
  Task1 = 'Task 1',
  Task2 = 'Task 2',
  Task3 = 'Task 3',
  Task4 = 'Task 4',
  Task5 = 'Task 5',
  Task6 = 'Task 6',
  Task7 = 'Task 7',
  Task8 = 'Task 8',
  Task9 = 'Task 9',
  Task10 = 'Task 10',
  Task11 = 'Task 11',
  Task12 = 'Task 12',
}

export const taskListRecord: Record<TaskList, Task> = {
  [TaskList.Task1]: { name: 'Task 1', isShowIcon: true, timer: 0 },
  [TaskList.Task2]: { name: 'Task 2', isShowIcon: true, timer: 0 },
  [TaskList.Task3]: { name: 'Task 3', isShowIcon: true, timer: 0 },
  [TaskList.Task4]: { name: 'Task 4', isShowIcon: true, timer: 0 },
  [TaskList.Task5]: { name: 'Task 5', isShowIcon: true, timer: 0 },
  [TaskList.Task6]: { name: 'Task 6', isShowIcon: true, timer: 0 },
  [TaskList.Task7]: { name: 'Task 7', isShowIcon: true, timer: 0 },
  [TaskList.Task8]: { name: 'Task 8', isShowIcon: true, timer: 0 },
  [TaskList.Task9]: { name: 'Task 9', isShowIcon: true, timer: 0 },
  [TaskList.Task10]: { name: 'Task 10', isShowIcon: true, timer: 0 },
  [TaskList.Task11]: { name: 'Task 11', isShowIcon: true, timer: 0 },
  [TaskList.Task12]: { name: 'Task 12', isShowIcon: true, timer: 0 },
};
