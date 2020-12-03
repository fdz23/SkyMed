import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.component.html'
})
export class AutorizacaoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => { this.router.navigate(['/home']); }, 5000);
  }

}
