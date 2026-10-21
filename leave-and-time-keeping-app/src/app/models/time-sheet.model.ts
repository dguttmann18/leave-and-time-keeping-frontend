export interface Project {
  id?: number;
  created?: string;
  updated?: string;
  active?: boolean;
  client?: string;
  name: string;
  description: string;
}

export type ProjectRequest = Pick<Project, 'name' | 'client' | 'description'>;

export interface TimeSheetEntry {
  id?: number;
  created?: string;
  updated?: string;
  active?: boolean;
  dateOfEntry: string;
  project?: Project;
  hours: number;
  billable?: boolean;
  description?: string;
}
