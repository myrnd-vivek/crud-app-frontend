import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  loginForm = new FormGroup({
    fName: new FormControl("",[Validators.required]),
    lName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    accept: new FormControl(false,[Validators.requiredTrue])
  })

  get fName() {
    return this.loginForm.get("fName")
  }

  get lName() {
    return this.loginForm.get("lName")
  }

  get email() {
    return this.loginForm.get("email")
  }

  get password() {
    return this.loginForm.get("password")
  }

  registerUser() {
    console.log(this.loginForm.value);
  }
}
