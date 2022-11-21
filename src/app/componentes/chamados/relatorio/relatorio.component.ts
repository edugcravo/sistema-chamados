import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  listaLabels: any = []
  listaValores: any = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.infosRelatorio()
  }

  finalizados = 0
  andamento = 0
  cancelados = 0
  tecnicos: any;
  mostrar = false;

  infosRelatorio(){

 

    for(let item of this.data){
      console.log(item)

      
      if(item.status == "em andamento"){
        this.andamento++
      }

      if(item.status == "finalizado"){
        this.finalizados++
      }

      if(item.status == 'cancelado'){
        this.cancelados++
      }


    }
    this.listaLabels.push('Finalizados', 'Aberto', 'cancelados')
    this.listaValores.push(this.finalizados, this.andamento, this.cancelados)

    setTimeout(() => {
      this.grafico()
      this.mostrar = true
    }, 500);
  }



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

  }
}
