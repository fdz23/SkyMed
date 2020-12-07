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
import { EstatisticaComponent } from './navegacao/painel administrativo/estatistica/estatistica.component';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';
import { ListMedicoAgendamentoComponent } from './cruds/medicos/list-medico-agendamento/list-medico-agendamento.component';
import { AgendarConsultaComponent } from './agendamento/agendar-consulta/agendar-consulta.component';
import { PainelComponent } from './acessos/painel/painel.component';
import { AutenticacaoHospital } from './autenticacao/autenticacao.hospital';
import { AutenticacaoMedico } from './autenticacao/autenticacao.medico';
import { AutenticacaoPaciente } from './autenticacao/autenticacao.paciente';
import { AutenticacaoAdmin } from './autenticacao/autenticacao.admin';
import { AutorizacaoComponent } from './navegacao/autorizacao/erro-autorizacao/autorizacao.component';
import { AutenticacaoDeslogado } from './autenticacao/autenticacao.deslogado';
import { AutenticacaoLogado } from './autenticacao/autenticacao.logado';
import { VerificacaoEmailComponent } from './navegacao/autorizacao/verificacao-email/verificacao-email.component';
import { ListConsultasComponent } from './agendamento/list-consultas/list-consultas.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'erro-autorizacao', component: AutorizacaoComponent},
  { path: 'autenticacao-conta/:email', component: VerificacaoEmailComponent},
  { path: 'medico-criar', component: CreateMedicoComponent, canActivate: [AutenticacaoHospital]},
  { path: 'paciente-criar', component: CreatePacienteComponent },
  { path: 'hospital-criar', component: CreateHospitalComponent },
  { path: 'especialidade-criar', component: CreateEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'especialidade-editar/:id', component: EditEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'especialidade-listar', component: ListEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'login', component: LoginComponent, canActivate: [AutenticacaoDeslogado] },
  { path: 'charts', component: EstatisticaComponent, canActivate: [AutenticacaoHospital] },
  { path: 'medico-listar', component: ListMedicoComponent, canActivate: [AutenticacaoHospital] },
  { path: 'medico-editar/:id', component: EditMedicoComponent, canActivate: [AutenticacaoMedico, AutenticacaoHospital] },
  { path: 'medico-listar-agendamento', component: ListMedicoAgendamentoComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'agendar-consulta', component: AgendarConsultaComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'estatistica', component: EstatisticaComponent, canActivate: [AutenticacaoHospital] },
  { path: 'paciente-editar/:id', component: PacienteEditarComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'paciente-listar', component: PacienteListarComponent, canActivate: [AutenticacaoHospital] },
  { path: 'agendamento/:id', component: AgendamentoComponent, canActivate: [AutenticacaoLogado] },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AutenticacaoLogado] },
  { path: 'painel-usuario', component: PainelComponent, canActivate: [AutenticacaoLogado] },
  { path: 'consultas-listar', component: ListConsultasComponent, canActivate: [AutenticacaoPaciente] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
