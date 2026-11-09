export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  FAMILY_RESPONSIBILITY = 'FAMILY_RESPONSIBILITY',
  SPECIAL = 'SPECIAL',
  UNPAID = 'UNPAID'
}

export interface LeaveApplication {
  id?: number;
  created?: string;
  updated?: string;
  active?: boolean;
  firstDay: string;
  lastDay: string;
  isPartial: boolean;
  hours?: number;
  leaveType: LeaveType;
  description: string;
}

export interface LeaveApplicationRequest {
  firstDay: string;
  lastDay: string;
  isPartial: boolean;
  hours?: number;
  leaveType: LeaveType;
  description: string;
}
