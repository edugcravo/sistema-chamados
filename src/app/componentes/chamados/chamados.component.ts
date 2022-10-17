import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ChamadosService } from 'src/app/services/chamados.service';
import { ChamadoIndividualComponent } from './chamado-individual/chamado-individual.component';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})



export class ChamadosComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  userLogado: any = localStorage.getItem('logado')
  chamado: any;

  constructor(private chamadosService: ChamadosService, private router: Router, public dialog: MatDialog) { }


  ngOnInit() {
    this.obterChamados()
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }
  }

  obterChamados(){
    this.chamadosService.retorna_chamado_por_id_tecnico(localStorage.getItem('id_tecnico')).then((data: any) =>{
      this.chamado = data

      this.chamado.chamado.forEach((element: any, index: any) => {
        element.id_usuario = this.chamado.usuarios[index]
      });
    })
  }




  abreChamado(id: any) {
    localStorage.setItem('id-chamado', id)
    this.router.navigate(['chamado-individual']);
    // this.dialog.open(ChamadoIndividualComponent, {
    //   width: '500px',
    //   data: id
    // });
  }

}
