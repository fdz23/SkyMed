import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMedicoComponent } from './cruds/medicos/create-medico/create-medico.component';
import { CreatePacienteComponent } from './cruds/pacientes/create-paciente/create-paciente.component';
import { HomeComponent } from './navegacao/home/home.component';
import { CreateHospitalComponent } from './cruds/hospitais/create-hospital/create-hospital.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent },
  { path: 'medico-criar', component: CreateMedicoComponent },
  { path: 'paciente-criar', component: CreatePacienteComponent},
  { path: 'hospital-criar', component: CreateHospitalComponent},




  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
