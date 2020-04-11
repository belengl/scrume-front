import { Component, OnDestroy, OnInit, Injectable,  } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './servicio/cabecera.service';
import { InvitationService } from './servicio/invitation.service';
import { InvitationDisplay } from './dominio/invitation.domain';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from './login-dialog/login-dialog.component';
import { UserService } from './servicio/user.service';
import { User } from './dominio/user.domain';
import { ProfileService } from './servicio/profile.service';
import { timer } from 'rxjs';
import { SecurityBreachService } from './servicio/breach.service';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  routes: Object[] = [];
  idioma: string  = "es";
  notifications : boolean = false;

  user : User;

  loading = false;
  title: any = 'scrume-front';

  isAdmin: boolean;

  constructor(private router: Router, private httpClient: HttpClient, private cabeceraService: CabeceraService, private invitationService : InvitationService,
     private dialog: MatDialog, private userService: UserService, private profileService: ProfileService, private securityBreachService: SecurityBreachService) {
    this.router.events.subscribe((event: RouterEvent) =>{
      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
      }
    });
  }

  ngOnInit(): void{
    this.cargarMenu();

    let token = sessionStorage.getItem("loginToken");
    if(token != null && token !== ""){
      this.getUserInfo();

      timer(0, 10000).subscribe(() => {

          this.getNotifications();
      });

    }else{
      this.cargarMenu();

      this.navigateTo("bienvenida");
    }

  }

  ngOnDestroy(): void {

  }

  navigateTo(route: string, method?: string, id?: number): void{
    if(method==undefined && id == undefined){
      this.router.navigate([route]);
    }else if(method != undefined && id == undefined){
      this.router.navigate([route], {queryParams:{method: method}});
    }else if(method == undefined && id != undefined){
      this.router.navigate([route], {queryParams:{id: id}});
    }else if(method != undefined && id != undefined){
      this.router.navigate([route], {queryParams:{method: method, id: id}});
    }
  }

  cargarMenu() : void{
    let token = sessionStorage.getItem("loginToken");
    let logged = token != null && token !== "";
    console.log("Logged", logged);

    this.routes = [
      {
        title: 'Bienvenida',
        route: '/bienvenida',
        icon: 'home',
        visible: 'true'
    },{
        title: 'Equipo',
        route: '/teams',
        icon: 'people',
        visible: logged
    },{
      title: 'Mis Tareas',
        route: '/myTasks',
        icon: 'list',
        visible: logged,
        method: 'getTasksOfUser'
    }
  ];
  if(logged) {
    this.securityBreachService.isAdmin().subscribe((isAdmin: boolean)=>{
      this.isAdmin = isAdmin;

      if(this.isAdmin){
        this.routes = [
          {
            title: 'Bienvenida',
            route: '/bienvenida',
            icon: 'home',
            visible: 'true'
        },{
            title: 'Panel Admin',
            route: '/admin',
            icon: 'build',
            visible: 'true'
        }];
      }

    });
  }
    
  }

  openLogin(): void {
    let dialog = this.dialog.open(LoginDialog, {
      width: '250px'
    });
    dialog.afterClosed().subscribe(()=>{
      let token = sessionStorage.getItem("loginToken");
      if(token != null && token != ""){
        this.getUserInfo();
      }
    });
  }

  logOut(): void{
    sessionStorage.setItem("loginToken", "");
    this.user = undefined;

    this.cargarMenu();
    this.navigateTo("bienvenida");
  }

  getUserInfo(){
    this.userService.getUser(this.userService.getUserLogged().idUser).subscribe((user: User)=>{
      this.user = user;

      console.log(" este es el user   " + JSON.stringify(user));
      this.securityBreachService.isAdmin().subscribe((isAdmin: boolean)=>{
        this.isAdmin = isAdmin;
        console.log("es admin: " + this.isAdmin);

        if (this.isAdmin == true){
          this.navigateTo("admin");
        }else{
          this.navigateTo("teams");
        }
      })

    });

  }

  openProfile(){
    this.navigateTo("profile");
  }

  getNotifications(){
    if (this.user != undefined) {
      this.invitationService.getInvitations().subscribe((invitations : InvitationDisplay[]) => {
        if (invitations.length != 0) {
          this.notifications = true;
        } else {
          this.notifications = false;
        }
      });
    }
  }

}
