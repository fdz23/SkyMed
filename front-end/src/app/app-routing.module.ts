import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMedicoComponent } from './cruds/medicos/create-medico/create-medico.component';

const routes: Routes = [
  { path: 'medico', component: CreateMedicoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
