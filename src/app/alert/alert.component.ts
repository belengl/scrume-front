import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationAlert } from '../dominio/notification.domain';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '../servicio/alerts.service';
import { SprintService } from '../servicio/sprint.service';
import { SprintDisplay } from '../dominio/sprint.domain';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  idSprint: number;
  idAlert: number;
  sprint: SprintDisplay;
  //alertas de sprint
  alertDate = new FormControl('');
  alertTitle = new FormControl('');

  alerts: NotificationAlert[] = [];

  alert: NotificationAlert;

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private alertService: AlertService, 
    private sprintService: SprintService) { }

  ngOnInit(): void {
   this.idSprint = this.data.idSprint;
   if(this.data.idAlert != undefined){
    this.idAlert = this.data.idAlert;
    this.alertService.getAlert(this.idAlert).subscribe((alert: NotificationAlert)=>{
      this.alertDate.setValue(new Date(alert.date));
      this.alertTitle.setValue(alert.title);
      this.alert = alert;
    });
   }else{
     this.idAlert = undefined;
   }
    this.sprintService.getSprint(this.idSprint).subscribe((sprintBD: SprintDisplay)=>{
      this.sprint = sprintBD;
    });
  }

  onSaveClick(): void{
    if(this.validForm()){
      if(this.idAlert != undefined){
        this.alert = {id: this.idAlert, date: new Date(this.alertDate.value), sprint: this.idSprint, title: this.alertTitle.value};
        this.alertService.editAlert(this.alert).subscribe();
      }else{
        for(let alert of this.alerts){
          this.alertService.crateAlert(alert).subscribe();
        }
      }
      
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  allowAdd(): boolean{
    let allow: boolean = true;

    //Están rellenos pero no requeridos
    allow = allow && this.alertTitle.value != "";
    allow = allow && this.alertDate.value != "";
    //Son válidos
    allow = allow && this.alertDate.valid;

    return allow;
  }

  beforeTodayDateValidator(date: FormControl){
    let formControlToTime : number = new Date(date.value).getTime();
    //Para controlar hoy hasta las 23:59
    formControlToTime = formControlToTime + 86340000;
    let todayToTime : number = new Date().getTime();
    if (formControlToTime < todayToTime) {
      date.setErrors({'beforeToday':true});
    } else {
      date.updateValueAndValidity();
    }
  }

  validDateInSprint(date: FormControl){
    let startDate = new Date(this.sprint.startDate).getTime();
    let endDate = new Date(this.sprint.endDate).getTime();

    let alertDate = new Date(date.value).getTime();
    //Para controlar hoy hasta las 23:59
    alertDate = alertDate + 86340000;

    if(startDate > alertDate){
      this.alertDate.setErrors({'betweenSprint': true});
    }else if(alertDate > endDate){
      this.alertDate.setErrors({'betweenSprint': true});
    }else{
      this.alertDate.updateValueAndValidity();
    }
  }

  getErrorMessageAlertDate(): string{
    return this.alertDate.hasError('beforeToday')? "La fecha seleccionada no puede ser anterior a la fecha actual" : 
    this.alertDate.hasError('betweenSprint')? "La fecha de la alerta debe estar dentro del Sprint": "";
  }

  //Alert Notificacion
  addAlert(): void{
    let alert: NotificationAlert;

    alert = {id: this.idAlert, date: new Date(this.alertDate.value), sprint: this.idSprint, title: this.alertTitle.value};
    this.alerts.push(alert);

    this.alertDate.setValue('');
    this.alertTitle.setValue('');
  }

  remove(alert: NotificationAlert): void{
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);

  }

  validForm(): boolean{
    if(this.idAlert == undefined){

      return this.alerts.length > 0;
    }else{
      return true;
    }
  }

}