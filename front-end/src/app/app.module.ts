import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMedicoComponent } from './cruds/medicos/create-medico/create-medico.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { HeaderComponent } from './navegacao/header/header.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HomeComponent } from './navegacao/home/home.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CreatePacienteComponent } from './cruds/pacientes/create-paciente/create-paciente.component';
import { CreateHospitalComponent } from './cruds/hospitais/create-hospital/create-hospital.component';
import { LoginComponent } from './acessos/login/login.component';
import { PacienteEditarComponent } from './cruds/pacientes/paciente-editar/paciente-editar.component';
import { PacienteListarComponent } from './cruds/pacientes/paciente-listar/paciente-listar.component';

import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { ListMedicoComponent } from './cruds/medicos/list-medico/list-medico.component';
import { EditMedicoComponent } from './cruds/medicos/edit-medico/edit-medico.component';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateEspecialidadeComponent } from './cruds/especialidades/create-especialidade/create-especialidade.component';
import { ListEspecialidadeComponent } from './cruds/especialidades/list-especialidade/list-especialidade.component';
import { EditEspecialidadeComponent } from './cruds/especialidades/edit-especialidade/edit-especialidade.component';
import { EstatisticaComponent } from './navegacao/painel administrativo/estatistica/estatistica.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AgendamentoComponent } from './agendamento/agendamento/agendamento.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ListMedicoAgendamentoComponent } from './cruds/medicos/list-medico-agendamento/list-medico-agendamento.component';
import { AgendarConsultaComponent } from './agendamento/agendar-consulta/agendar-consulta.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    CreateMedicoComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreatePacienteComponent,
    CreateHospitalComponent,
    LoginComponent,
    ListMedicoComponent,
    EditMedicoComponent,
    PacienteListarComponent,
    PacienteEditarComponent,
    CreateEspecialidadeComponent,
    ListEspecialidadeComponent,
    EditEspecialidadeComponent,
    AgendamentoComponent,
    ListMedicoAgendamentoComponent,
    AgendarConsultaComponent,
    EstatisticaComponent,
    AgendamentoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    FormsModule,
    AppRoutingModule,
    TabViewModule,
    HttpClientModule,
    FieldsetModule,
    AutoCompleteModule,
    MessagesModule,
    MessageModule,
    InputMaskModule,
    KeyFilterModule,
    PasswordModule,
    MenubarModule,
    AccordionModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    ProgressBarModule,
    ConfirmDialogModule,
    NgxMaskModule.forRoot(),
    TableModule,
    InputNumberModule,
    FullCalendarModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
