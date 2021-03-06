import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../servicio/user.service';

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
    styleUrls: ['./login-dialog.css']
  })
  export class LoginDialog implements OnInit{
  
    email = new FormControl('', { validators: [Validators.required, Validators.email]});
    pass = new FormControl('', { validators: [Validators.required] });
    showPass : boolean = false;
  

    
    constructor(
      public dialogRef: MatDialogRef<LoginDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {}
  
  
    ngOnInit(): void {
    }
  
    cancel(): void {
      this.dialogRef.close();
    }
  
    login() : void {
      this.userService.checkCredentials(this.email.value, this.pass.value).subscribe((valid: boolean)=>{
        if(valid){
          sessionStorage.setItem("loginToken", btoa(this.email.value+":"+this.pass.value));
          this.dialogRef.close();
        }else{
          this.pass.setErrors({invalid: true});
        }
      });
      
    }

    validForm(): boolean{
      let valid: boolean = true;

      valid = valid && this.email.valid;
      valid = valid && this.pass.valid;

      return valid
    }
    changePassState(){
        this.showPass = !this.showPass;
    }

    getErrorMessageEmail() : string{
      return this.email.hasError('required')? "Debe introducir un email": this.email.hasError('email') ? "El email debe tener un formato válido": "";
    }
    getErrorMessagePass(): string{
      return this.pass.hasError('required')? "Debe introducir una contraseña": this.pass.hasError('invalid')? "Email o contraseña no encontrado, verifique los datos.":"";
    }
  
}