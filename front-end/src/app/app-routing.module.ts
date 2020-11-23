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
import { AdmComponent } from './navegacao/adm/adm-menu/adm.component';
import { RelatorioComponent } from './navegacao/adm/relatorios/relatorio/relatorio.component';
import { EstatisticaComponent } from './navegacao/adm/estatisticas/estatistica/estatistica.component';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';
import { ListMedicoAgendamentoComponent } from './cruds/medicos/list-medico-agendamento/list-medico-agendamento.component';
import { AgendarConsultaComponent } from './agendamento/agendar-consulta/agendar-consulta.component';
import { AutenticacaoHospital } from './autenticacao/autenticacao.hospital';
import { AutenticacaoMedico } from './autenticacao/autenticacao.medico';
import { AutenticacaoPaciente } from './autenticacao/autenticacao.paciente';
import { AutenticacaoAdmin } from './autenticacao/autenticacao.admin';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'medico-criar', component: CreateMedicoComponent, canActivate: [AutenticacaoHospital]},
  { path: 'paciente-criar', component: CreatePacienteComponent },
  { path: 'hospital-criar', component: CreateHospitalComponent },
  { path: 'especialidade-criar', component: CreateEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'especialidade-editar/:id', component: EditEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'especialidade-listar', component: ListEspecialidadeComponent, canActivate: [AutenticacaoHospital] },
  { path: 'login', component: LoginComponent },
  { path: 'medico-listar', component: ListMedicoComponent, canActivate: [AutenticacaoHospital] },
  { path: 'medico-editar/:id', component: EditMedicoComponent, canActivate: [AutenticacaoMedico, AutenticacaoHospital] },
  { path: 'paciente-editar/:id', component: PacienteEditarComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'paciente-listar', component: PacienteListarComponent, canActivate: [AutenticacaoAdmin] },
  { path: 'agendamento/:id', component: AgendamentoComponent, canActivate: [AutenticacaoPaciente,
                                                                            AutenticacaoMedico,
                                                                            AutenticacaoAdmin,
                                                                            AutenticacaoHospital] },
  { path: 'medico-listar-agendamento', component: ListMedicoAgendamentoComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'agendar-consulta', component: AgendarConsultaComponent, canActivate: [AutenticacaoPaciente] },
  { path: 'adm', component: AdmComponent, canActivate: [AutenticacaoAdmin] },
  { path: 'relatorio', component: RelatorioComponent, canActivate: [AutenticacaoHospital] },
  { path: 'estatistica', component: EstatisticaComponent, canActivate: [AutenticacaoHospital] },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AutenticacaoPaciente,
                                                                        AutenticacaoMedico,
                                                                        AutenticacaoHospital] },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
