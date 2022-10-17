import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadosService } from 'src/app/services/chamados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chamado-individual-user',
  templateUrl: './chamado-individual-user.component.html',
  styleUrls: ['./chamado-individual-user.component.css']
})
export class ChamadoIndividualUserComponent implements OnInit {

 
  chamadosForm: UntypedFormGroup;

  nomeUsuario: any = localStorage.getItem('usuario')
  userLogado: any = localStorage.getItem('logado')
  IdChamado: any = localStorage.getItem('id-chamado')
  chamado: any;
  usuarioChamado: any;
  tecnicoChamado: any;
  problemas: any;
  problemaSelecionado: any;
  status: any;


  constructor(private router: Router, private chamadoService: ChamadosService, private fb: UntypedFormBuilder) { 
    this.chamadosForm = this.fb.group({
      resolucao_problema: ['', [Validators.required]],
      status: [''],
      tipo_problema: [this.problemaSelecionado]
    });

  }


  ngOnInit() {
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }

    this.obterChamado()
    this.obterTiposProblemas()
    this.obterAcompanhamento()
  }

  obterChamado(){
    this.chamadoService.retorna_chamado_por_id(this.IdChamado).then((data: any) =>{
      console.log(data)
      this.status = data.chamado.status
      this.chamado = data.chamado
      this.usuarioChamado = data.usuario
      this.tecnicoChamado = data.tecnico
      this.problemaSelecionado = this.chamado.tipo_problema
    })
  }

  enviaDadosChamado(){
    let tecnico = 1
    let dadosForm = {
      resolucao_problema: this.chamadosForm.value.resolucao_problema,
      tipo_problema: this.chamadosForm.value.tipo_problema,
      status: "finalizado"
    }

    this.chamadoService.atualiza_chamado(this.chamado.id ,dadosForm, tecnico).then((data: any) =>{

      if (!data.status) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao enviar resposta',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Resposta enviada com sucesso !'
        })
        this.obterAcompanhamento()
      }
    })
  }


  cancelarChamado(){
    let tecnico = 1
    let body = {
      "status": "cancelado"
    }
    Swal.fire({
      title: 'Tem certeza que deseja cancelar?',
      text: "Ao cancelar, não podera ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Chamado cancelado com sucesso !'
        })
      this.chamadoService.atualiza_status_chamado(this.chamado.id ,body, tecnico)
      this.router.navigate(['visualizacao-chamado']);
      }
    })
  }


  reabrirChamado(){
    let tecnico = 1
    let body = {
      "status": "aberto"
    }
    Swal.fire({
      title: 'Tem certeza que deseja reabrir o chamado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Chamado reaberto com sucesso !'
        })
      this.chamadoService.atualiza_status_chamado(this.chamado.id ,body, tecnico)
      this.router.navigate(['visualizacao-chamado']);
      }
    })
  }

  obterTiposProblemas(){
    this.chamadoService.retorna_todos_tipos_problemas().then((dados: any) =>{
      this.problemas = dados.data
    })
  }


  respostas: any;

  obterAcompanhamento(){
    this.chamadoService.retorna_acompanhamento(this.IdChamado).then((dados: any) =>{
      this.respostas = dados.respostas

      
    })
  }
}
