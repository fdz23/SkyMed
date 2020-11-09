import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ActivatedRoute } from '@angular/router';
import { Medicos } from 'src/assets/medicos';
import { MedicoService } from 'src/app/servicos/medico.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html'
})
export class AgendamentoComponent implements OnInit {

  public medicoid;
  events: any[] = [];

  options: any;

  constructor(
    private route: ActivatedRoute,
    private medicoService: MedicoService) {
      this.route.params.subscribe(params => this.medicoid = params.id);
      const name = Calendar.name;
  }

  horarioEntrada: any = '08:00:00';
  horarioSaida: any = '18:00:00';

  ngOnInit(): void {
    this.obtenhaMedicoPorId();

    this.events = [{
      id: 1,
      title: 'Consulta Fernando',
      start: '2020-11-05T10:00:00',
      end: '20120-11-05T11:00:00'
    }];

    this.options = {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridDay',
      slotEventOverlap: false,
      allDaySlot: false,
      slotMinTime: this.horarioEntrada,
      slotMaxTime: this.horarioSaida,
      slotDuration: '00:30:00',
      slotLabelInterval: '01:00:00',
      expandRows: true,
      contentHeight: 575,
      headerToolbar: {
        right: 'prev,next',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      navLinks: true
    };
  }


  public obtenhaMedicoPorId(): void {
    this.medicoService.obtenhaMedicoPorId(this.medicoid).subscribe((medico: Medicos) => {
    }, () => { });
  }
}
