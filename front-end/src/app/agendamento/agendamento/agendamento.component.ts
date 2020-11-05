import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html'
})
export class AgendamentoComponent implements OnInit {

  events: any[] = [];

  options: any;

  constructor() {
    const name = Calendar.name;
  }

  horarioEntrada: any = '08:00:00';
  horarioSaida: any = '19:00:00';

  ngOnInit(): void {

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

}
