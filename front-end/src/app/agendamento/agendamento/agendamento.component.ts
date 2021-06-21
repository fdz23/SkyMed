import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicos } from 'src/assets/medicos';
import { MedicoService } from 'src/app/servicos/medico.service';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Horarios } from 'src/assets/horarios';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { Pessoas } from 'src/assets/pessoas';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  providers: [ConfirmationService]
})
export class AgendamentoComponent implements OnInit {

  public medicoid;
  medico: Medicos;
  events: any[] = [];
  msgs: Message[] = [];
  options: any;

  constructor(
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private router: Router) {
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
  }

  public obtenhaMedicoPorId(): void {
    this.medicoService.obtenhaMedicoPorId(this.medicoid).subscribe((medico: Medicos) => {
      debugger;
      this.medico = medico;
      this.events = [];
      const todosDias: any[] = [0, 1, 2, 3, 4, 5, 6];
      const diasTrabalho: any[] = [];
      medico.horariosTrabalho.forEach(d => diasTrabalho.push(d.diaDaSemana));
      medico.horariosConsulta.forEach(h => {
        this.events = [...this.events, {
          id: h.id,
          groupId: h.paciente.id,
          title: 'Consulta',
          start: `${new Date(h.inicio).toISOString()}`,
          end: `${new Date(h.fim).toISOString()}`
        }];
      });
      this.options = {
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        slotMinTime: new Date(medico.horariosTrabalho[0].inicio).toLocaleTimeString('pt-BR'),
        slotMaxTime: new Date(medico.horariosTrabalho[0].fim).toLocaleTimeString('pt-BR'),
        slotEventOverlap: false,
        allDaySlot: false,
        slotDuration: '00:30',
        slotLabelInterval: new Date(this.medico.especialidade.duracaoConsulta).toLocaleTimeString('pt-BR'),
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
    }, (error) => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: `${error.error}` });
    });
  }

  handleDateClick(arg): void {
    debugger;
    this.confirmationService.confirm({
      message: `Tem certeza que deseja criar um agendamento às ${arg.date.toLocaleTimeString('pt-BR')}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const consulta = new Date(this.medico.especialidade.duracaoConsulta);
        const dataClicada = new Date(arg.date.getTime());
        const final = this.obtenhaDataFinal(consulta, dataClicada);

        if (this.events.find(d => d.start === `${arg.date.toISOString()}` && d.end === `${final.toISOString()}`)) {
          alert('Esse horário já possui um agendamento!');
        } else {
          const usuario = JSON.parse(localStorage.currentUser);

          this.pessoaService.obtemPacientePeloUsuarioId(usuario.id).subscribe(
            pessoa => {
              this.events = [...this.events, {
                groupId: pessoa.id,
                title: 'Consulta',
                start: `${arg.date.toISOString()}`,
                end: `${final.toISOString()}`
              }];
            },
            erro => {
              this.msgs = [];
              this.msgs.push({ severity: 'error', detail: erro.error });
            }
          );
        }
      },
      reject: () => {
      }
    });
  }

  salvar(): void {
    const eventos = [];

    this.events.forEach(event => {
      const evento = {
        id: event.id,
        paciente: { id: event.groupId } as Pessoas,
        inicio: new Date(event.start),
        fim: new Date(event.end)
      } as Horarios;

      if (!this.medico.horariosConsulta) {
        this.medico.horariosConsulta = [];
      }

      eventos.push(evento);
    });

    this.medico.horariosConsulta = eventos;

    this.medicoService.atualizaMedico(this.medico).subscribe(
      sucesso => {
        this.router.navigate(['/medico-listar-agendamento']);
      },
      erro => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: erro.error });
      }
    );
  }

  obtenhaDataFinal(consulta: Date, dataClicada: Date): Date {
    return new Date(
      dataClicada.setTime(
        dataClicada.getTime()
        + this.obtenhaHorasEmMilisegundos(consulta.getUTCHours())
        + this.obtenhaMinutosEmMilisegundos(consulta.getUTCMinutes())
      )
    );
  }

  obtenhaHorasEmMilisegundos(horas: number): number {
    return horas * 60 * 60 * 1000;
  }

  obtenhaMinutosEmMilisegundos(minutos: number): number {
    return minutos * 60 * 1000;
  }
}
