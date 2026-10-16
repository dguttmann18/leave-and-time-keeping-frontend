import { inject, Injectable } from '@angular/core';
import { Project, ProjectRequest, TimeSheetEntry } from '../models/time-sheet.model';
import { clients, projects, timeSheets } from '../data/time-sheet.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  private http = inject(HttpClient);

  // Proxied to http://localhost:8092 by the dev server (see proxy.conf.json)
  private readonly apiUrl = '/api';

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/all`);
  }

  addNewProject(project: ProjectRequest): Observable<void> {
    const request: ProjectRequest = {
      name: project.name.trim(),
      client: project.client?.trim(),
      description: project.description.trim(),
    };

    return this.http.post<void>(`${this.apiUrl}/project/new`, request);
  }

  getAllActiveProjects(): Project[] {
    return projects;
  }

  getAllActiveTimeSheetEntries() : TimeSheetEntry[] {
    return timeSheets;
  }

  getAllClients() : string[] {
    return clients;
  }
}
