import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ActivatedRoute } from '@angular/router';
import { Medicos } from 'src/assets/medicos';
import { MedicoService } from 'src/app/servicos/medico.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  providers: [ConfirmationService]
})
export class AgendamentoComponent implements OnInit {

  public medicoid;
  medico: Medicos;
  events: any[] = [];

  options: any;

  constructor(
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) {
      this.route.params.subscribe(params => this.medicoid = params.id);
      const name = Calendar.name;
  }

  horarioEntrada: any = '08:00:00';
  horarioSaida: any = '18:00:00';

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.obtenhaMedicoPorId();

    this.options = {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridDay',
      slotEventOverlap: false,
      allDaySlot: false,
      slotDuration: '00:30:00',
      slotLabelInterval: '01:00:00',
      expandRows: true,
      contentHeight: 575,
      headerToolbar: {
        right: 'prev,next',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      navLinks: true,
      locale: 'br',
      buttonText: {
        today:    'Hoje',
        month:    'Mês',
        week:     'Semana',
        day:      'Dia',
        list:     'Lista'
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false
      }
    };

    this.events = [{
      title: 'Consulta Fernando',
      start: '2020-11-14T04:10:00',
      end: '2020-11-14T04:20:00'
    }];
  }

  public obtenhaMedicoPorId(): void {
    this.medicoService.obtenhaMedicoPorId(this.medicoid).subscribe((medico: Medicos) => {
      this.medico = medico;

      const todosDias: any[] = [0, 1, 2, 3, 4, 5, 6];
      const diasTrabalho: any[] = [];
      medico.horariosTrabalho.forEach(d => diasTrabalho.push(d.diaDaSemana));

      this.options = {
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        slotMinTime: new Date(medico.horariosTrabalho[0].inicio).toLocaleTimeString(),
        slotMaxTime: new Date(medico.horariosTrabalho[0].fim).toLocaleTimeString(),
        slotEventOverlap: false,
        allDaySlot: false,
        slotDuration: '00:30',
        slotLabelInterval: new Date(this.medico.especialidade.duracaoConsulta).toLocaleTimeString(),
        expandRows: true,
        contentHeight: 575,
        headerToolbar: {
          right: 'prev,next',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        navLinks: true,
        locale: 'br',
        buttonText: {
          today:    'Hoje',
          month:    'Mês',
          week:     'Semana',
          day:      'Dia',
          list:     'Lista'
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        },
        dateClick: this.handleDateClick.bind(this),
        hiddenDays: todosDias.filter(d => !diasTrabalho.includes(d))
      };
    }, () => { });
  }

  handleDateClick(arg): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja criar um agendamento às ${arg.date.toLocaleTimeString()}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const consulta = new Date(this.medico.especialidade.duracaoConsulta);
        const dataClicada = new Date(arg.date.getTime());
        const final = new Date(dataClicada.setTime(dataClicada.getTime() + consulta.getHours() * 60 * 60 * 1000 + consulta.getMinutes() * 60 * 1000));
        this.events = [...this.events, {
          title: 'Consulta Fernando',
          start: `${arg.date.toISOString()}`,
          end: `${final.toISOString()}`
        }];

      },
      reject: () => {
          console.log('deu ruim');
      }
  });
  }
}
