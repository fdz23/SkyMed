import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() {}

  senha: string;
  email: string;
  msgs: string;
  feedback = false;

  ngOnInit(): void {}

  login(): void {
    console.log('logou!');
  }

}
