import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMedicoComponent } from './cruds/medicos/create-medico/create-medico.component';
import { CreatePacienteComponent } from './cruds/pacientes/create-paciente/create-paciente.component';
import { HomeComponent } from './navegacao/home/home.component';
import { CreateHospitalComponent } from './cruds/hospitais/create-hospital/create-hospital.component';
import { LoginComponent } from './acessos/login/login.component';
import { ListMedicoComponent } from './cruds/medicos/list-medico/list-medico.component';
import { EditMedicoComponent } from './cruds/medicos/edit-medico/edit-medico.component';
import { PacienteEditarComponent } from './cruds/pacientes/paciente-editar/paciente-editar.component';
import { PacienteListarComponent } from './cruds/pacientes/paciente-listar/paciente-listar.component';
import { CreateEspecialidadeComponent } from './cruds/especialidades/create-especialidade/create-especialidade.component';
import { ListEspecialidadeComponent } from './cruds/especialidades/list-especialidade/list-especialidade.component';
import { EditEspecialidadeComponent } from './cruds/especialidades/edit-especialidade/edit-especialidade.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'medico-criar', component: CreateMedicoComponent },
  { path: 'paciente-criar', component: CreatePacienteComponent },
  { path: 'hospital-criar', component: CreateHospitalComponent },
  { path: 'especialidade-criar', component: CreateEspecialidadeComponent },
  { path: 'especialidade-editar', component: EditEspecialidadeComponent },
  { path: 'especialidade-listar', component: ListEspecialidadeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'medico-listar', component: ListMedicoComponent },
  { path: 'medico-editar/:id', component: EditMedicoComponent },
  { path: 'paciente-editar/:id', component: PacienteEditarComponent },
  { path: 'paciente-listar', component: PacienteListarComponent },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
