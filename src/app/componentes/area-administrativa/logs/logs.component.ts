import { Component, OnInit } from '@angular/core';
import { ChamadosService } from 'src/app/services/chamados.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: any;

  constructor(private chamadoService: ChamadosService) { }

  ngOnInit() {
    this.retornaLogs()
  }


  retornaLogs(){
    this.chamadoService.log().then((dados: any) =>{
      this.logs = dados.data
      console.log(this.logs)
    })
  }
}
