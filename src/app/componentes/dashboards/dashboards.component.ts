import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')

  constructor(private chamadosService: ChamadosService, private router:Router) { 
    Chart.register(...registerables);
  }

  ngOnInit() {
    // this.iniciaGrafico()
    this.obterTodosChamados()
  }

  listaLabels: any = []
  listaValores: any = []

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  // iniciaGrafico(){
  //   setTimeout (() => {
  //     this.grafico()
  //  }, 500);
  // }

  grafico() {

    let colors = [
      '#15bb15',
      '#476A98',
      '#D83A3A',
      '#6599C9',
      '#61906C',
      '#507356',
      '#E45933'
    ]

    console.log(this.finalizados)
    console.log(this.andamento)
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  
    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: this.listaLabels,
        datasets: [{
          label: 'My First Dataset',
          data: this.listaValores,
          backgroundColor: colors,
          hoverOffset: 4
        }],
      },
    })

  //   new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: this.listaLabels,
  //         datasets: [{
  //             label: 'Finalizados',
  //             data: this.finalizados,
  //             borderWidth: 4,
  //             backgroundColor: "rgb(115 185 243 / 15%)",
  //             borderColor: "#007ee7",
  //             fill: true,
  //         },
  //         {
  //           label: 'Em andamento',
  //           data: this.andamento,
  //           borderWidth: 4,
  //           backgroundColor: "rgb(250 127 114 / 15%)",
  //           borderColor: "red",
  //           fill: true,
  //       },
  //       ],
  //     },
  
  // });
  }


  finalizados = 0
  andamento = 0
  cancelados = 0

  obterTodosChamados(){
    let id = localStorage.getItem('id_tecnico')
    this.chamadosService.retorna_chamado_por_id_tecnico(id).then((data: any) =>{
      console.log(data.chamado)

      

      for(let item of data?.chamado){
        if(item.status == 'finalizado'){
          this.finalizados++
        }

        if(item.status == 'em andamento'){
          this.andamento++
        }

        if(item.status == 'cancelado'){
          this.cancelados++
        }
      }

      this.listaLabels.push('Finalizados', 'Aberto', 'cancelados')
      this.listaValores.push(this.finalizados, this.andamento, this.cancelados)

      setTimeout(() => {
        this.grafico()
      }, 1000);
  })
}
}
