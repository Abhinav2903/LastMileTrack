import { GroupId } from "./taskList.enum";

export interface Task {
    name: string;
    isShowIcon: boolean;
    timer: number;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    groupId: GroupId; // Assuming GroupId is defined elsewhere
  }

export { GroupId };
