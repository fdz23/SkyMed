import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { NgxSpinnerService } from "ngx-spinner";

import {CardModule} from 'primeng/card';





@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html'
})
export class EstatisticaComponent implements OnInit {

  dataLine: any;
  dataPie: any;
  optionsLine: any;
  optionsPie: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService
  ) {
    this.dataLine = {
      labels: ['jan.', ' fev.', ' mar.', ' abr.', ' maio', ' jun.', ' jul.', ' ago.', ' set.', ' out.', ' nov.', ' dez.'],
      datasets: [
        {
          label: 'Numero de Atendimentos',
          data: [15, 29, 30, 51, 76, 105, 170, 232, 298, 451, 543, 821 ],
          fill: false,
          borderColor: '#4bc0c0'

        },
        /*{
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false
        }*/
      ]
    }

    this.dataPie = {
      labels: ['Ortopedista', 'Dermatologista', 'Hematologista', 'Oncologista', 'Colonoscopista', 'outros'],
      datasets: [
        {
          label: 'Especialidades (%)',
          data: [25 , 15, 3, 32, 23, 2],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#459295",
            "#6dd875",
            "#ffffff"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#459295",
            "#6dd875",
            "#ffffff"
        ]
        }
      ]
    }

    this.optionsLine = {
      title: {
        display: true,
        text: 'Numero de Atendimentos por Mes',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }

    this.optionsPie = {
      title: {
        display: true,
        text: 'Especialidades (%)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
          }
        }
      }
    }
  }

  msgs: Message[] = [];

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  selectDataLine(event) {
    this.msgs.push({ severity: 'info', summary: 'Data Selected', 'detail': this.dataLine.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  selectDataPie(event) {
    this.msgs.push({ severity: 'info', summary: 'Data Selected', 'detail': this.dataPie.datasets[event.element._datasetIndex].data[event.element._index] });
  }





}
