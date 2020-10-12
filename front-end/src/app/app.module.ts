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
import { PacienteEditarComponent} from './cruds/pacientes/paciente-editar/paciente-editar.component';
import { PacienteListarComponent} from './cruds/pacientes/paciente-listar/paciente-listar.component';

import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateEspecialidadeComponent } from './cruds/especialidades/create-especialidade/create-especialidade.component'



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
    PacienteListarComponent,
    PacienteEditarComponent,
    CreateEspecialidadeComponent

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
    NgxMaskModule.forRoot(),
    TableModule,
    ConfirmDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
