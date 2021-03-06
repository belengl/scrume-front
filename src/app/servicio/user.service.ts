import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Observable } from 'rxjs';
import { User, SimpleUserNick, UserIdUser, UserRegister } from '../dominio/user.domain';
import { Box } from '../dominio/box.domain';

@Injectable({providedIn:'root'})

export class UserService {
    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    checkCredentials(user: string, pass: string): Observable<boolean>{
        return this.httpClient.get<boolean>(this.cabeceraService.getCabecera()+"api/login/isAValidUser", {headers: this.cabeceraService.getCustomBasicAuthentication(user, pass)});
    }

    findUserAuthenticated(): Observable<UserIdUser>{
        return this.httpClient.get<UserIdUser>(this.cabeceraService.getCabecera()+"api/user/find-by-authorization", {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getUser(id: number):Observable<User>{
        return this.httpClient.get<User>(this.cabeceraService.getCabecera()+"api/user/"+id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getAllUsersOfWorkspace(id: number){
        return this.httpClient.get<SimpleUserNick[]>(this.cabeceraService.getCabecera()+"api/user/list-by-workspace/"+id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getAllBoxes() : Observable<Box[]>{
      return this.httpClient.get<Box[]>(this.cabeceraService.getCabecera() + "api/box/all", {headers: this.cabeceraService.getBasicAuthentication()});
    }

    isValidEmail(email : string) : Observable<boolean> {
      let data = {"username": email};
      return this.httpClient.post<boolean>(this.cabeceraService.getCabecera() + "api/login/isAValidEmail", data, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    registerUser(user: UserRegister) : Observable<UserRegister> {
      return this.httpClient.post<UserRegister>(this.cabeceraService.getCabecera() + "api/login", user);
    }

}
