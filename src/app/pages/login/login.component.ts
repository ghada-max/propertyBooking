import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup=new FormGroup({
    username:new FormControl(""),
    password:new FormControl("")
  })
   router=inject(Router);
  onLogin(){
    const formValues=this.loginForm.value;

    if(formValues.username=="admin" && formValues.password=="123")
      {
        this.router.navigateByUrl('dashboard');
    
      }
      else{
        alert("Invalid credentials");
      }
  }

}
