import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Observable } from 'rxjs';
import { SprintDisplay, Sprint } from '../dominio/sprint.domain';

@Injectable({providedIn:'root'})

export class SprintService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getSprintsOfProject(idProject : Number){
        let sprint1 : SprintDisplay = {
            id: 1,
            starDate: new Date("2019-01-16"),
            endDate: new Date("2019-02-16"),
            totalTasks: 20,
            completedTasks: 15,
            totalHP: 100,
            completedHP: 76,
        }
        let sprint2 : SprintDisplay = {
            id: 2,
            starDate: new Date("2019-02-17"),
            endDate: new Date("2019-03-17"),
            totalTasks: 18,
            completedTasks: 17,
            totalHP: 80,
            completedHP: 77,
        }
        let sprint3 : SprintDisplay = {
            id: 3,
            starDate: new Date("2019-03-18"),
            endDate: new Date("2019-04-18"),
            totalTasks: 19,
            completedTasks: 19,
            totalHP: 75,
            completedHP: 75,
        }

        let sprints : SprintDisplay[]=[];
        sprints.push(sprint1);
        sprints.push(sprint2);
        sprints.push(sprint3);
        return sprints;

    }

    createSprint(sprint : Sprint){
      let sprint1 : Sprint;
      sprint1 = {id : 1, starDate: sprint.starDate, endDate: sprint.endDate, proyecto: 1};

      let response = new Observable(obs => {
          setTimeout(() => {
              obs.next(sprint1);
          }, 1000);
      });

      return response;
    }

    editSprint(id: number, sprint : Sprint) : any {
      // return this.httpClient.post<Sprint>(this.cabeceraService.getCabecera() + "/sprint?id=" + id, sprint);
      let response = new Observable(obs => {
          setTimeout(() => {
              obs.next(sprint);
          }, 1000);
      });

      return response;
    }

    deleteSprint(id: number):any {
      // return this.httpClient.post<Sprint>(this.cabeceraService.getCabecera() + "/sprint?id=" + id, sprint);
    }

}

