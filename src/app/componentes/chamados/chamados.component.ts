import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ChamadosService } from 'src/app/services/chamados.service';
import { ChamadoIndividualComponent } from './chamado-individual/chamado-individual.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

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

  dadosEnviar: any = [];

  checarIndividualCheckbox(){
    console.log(this.chamado.chamado)
    this.chamado?.chamado.forEach((element: any, index: any)=> {
      let check = document.getElementById(element.id) as HTMLInputElement

        if(check){
          if(check.checked){
            console.log('ta checkado')

              if(!this.dadosEnviar.includes(element)){
                this.dadosEnviar.push(element)
              }
          
          }else{
            this.dadosEnviar.splice(index,1)
            if(this.dadosEnviar.includes(element)){
              this.dadosEnviar.splice(index,1)
          }}
        }

    })

    console.log(this.dadosEnviar)

  }


  gerarRelatorio(){
    this.dialog.open(RelatorioComponent, {
      data: this.dadosEnviar
    });
  
}
  

}
