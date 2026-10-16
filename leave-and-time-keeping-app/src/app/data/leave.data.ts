import { LeaveApplication, LeaveType } from '../models/leave.model';


export const leaveApplications: LeaveApplication[] = [
  {
    firstDay: '2026-11-02',
    lastDay: '2026-11-06',
    isPartial: false,
    hours: 40,
    leaveType: LeaveType.ANNUAL,
    description: 'Annual leave for a family holiday'
  },
  {
    firstDay: '2026-10-19',
    lastDay: '2026-10-19',
    isPartial: true,
    hours: 4,
    leaveType: LeaveType.ANNUAL,
    description: 'Taking the afternoon off'
  },
  {
    firstDay: '2026-10-21',
    lastDay: '2026-10-22',
    isPartial: false,
    hours: 16,
    leaveType: LeaveType.SICK,
    description: 'Medical leave due to illness'
  },
  {
    firstDay: '2026-11-16',
    lastDay: '2026-11-17',
    isPartial: false,
    hours: 16,
    leaveType: LeaveType.FAMILY_RESPONSIBILITY,
    description: 'Attending to a family matter'
  },
  {
    firstDay: '2026-12-01',
    lastDay: '2026-12-01',
    isPartial: true,
    hours: 2,
    leaveType: LeaveType.ANNUAL,
    description: 'Leaving early for a personal appointment'
  },
  {
    firstDay: '2026-12-14',
    lastDay: '2026-12-18',
    isPartial: false,
    hours: 40,
    leaveType: LeaveType.ANNUAL,
    description: 'Year-end holiday'
  },
  {
    firstDay: '2026-10-26',
    lastDay: '2026-10-28',
    isPartial: false,
    hours: 24,
    leaveType: LeaveType.UNPAID,
    description: 'Unpaid leave for personal reasons'
  },
  {
    firstDay: '2026-10-30',
    lastDay: '2026-10-30',
    isPartial: true,
    hours: 3,
    leaveType: LeaveType.SICK,
    description: 'Medical appointment'
  }
];
