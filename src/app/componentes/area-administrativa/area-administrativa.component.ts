import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { BarChartOption, ChartData, ChartOption, ChartView, PieChartView } from 'ngx-chart';
import { single } from 'rxjs';
import { ChamadosService } from 'src/app/services/chamados.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { LogsComponent } from './logs/logs.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@Component({
  selector: 'app-area-administrativa',
  templateUrl: './area-administrativa.component.html',
  styleUrls: ['./area-administrativa.component.css']
})
export class AreaAdministrativaComponent implements OnInit {

  usuarioForm: UntypedFormGroup;
  todosUsuarios: any;

  listaLabels: any = []
  listaValores: any = []

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;



  constructor(private fb: UntypedFormBuilder, private loginService: LoginService, public dialog: MatDialog, private chamadoService: ChamadosService) {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      nascimento: ['', [Validators.required, Validators.maxLength(50)]],
      setor: ['', [Validators.required]],
      ramal:['', [Validators.required]],
      user_passw: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
    });

    Chart.register(...registerables);

   }

  ngOnInit() {
    this.obterTodosUsuarios()
    this.obterTodosTecnicos()
    this.obterChamados()
    setTimeout(() => {
      this.grafico()
    }, 500);
  }


  enviaDadosUsuario(){
    this.loginService.criaUser(this.usuarioForm.value).then((dados: any) =>{
      console.log(dados)


      if (!dados.data) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao cadastrar usuário',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Usuário cadastrado com sucesso !'
        })
      }
    })
  }


  obterTodosUsuarios(){
    this.loginService.retornaTodosUsers().then(dados =>{
      this.todosUsuarios = dados
      console.log(dados)
    })
  }


  openDialogUsers(): void {
    this.dialog.open(UsuariosComponent, {
      width: '50%',
      data: this.todosUsuarios
    });
  }



  todosTecnicos: any;

  obterTodosTecnicos(){
  this.loginService.retornaTodosTecnicos().then(dados =>{
    this.todosTecnicos = dados
    console.log(dados)
  })
  }


  openDialogTecnico(): void {
    this.dialog.open(TecnicosComponent, {
      width: '50%',
      data: this.todosTecnicos
    });
  }


  openDialogLogs(): void {
    this.dialog.open(LogsComponent, {
      width: '50%',
      height: '600px'
    });
  }

  todosChamados: any;

  andamento: any = 0;
  cancelado: any = 1;
  totalChamados: any = 0;
  finalizados: any = 0;

  obterChamados(){
    this.chamadoService.retorna_todos_chamados().then(dados =>{
      this.todosChamados = dados

      for(let item of this.todosChamados.chamado){
        console.log(item)
        this.totalChamados++
        if(item.status == 'em andamento'){
          this.andamento++
        }

        if(item.status == 'cancelado'){
          this.cancelado++
        }
      }
      console.log(dados)
      console.log(this.andamento)
    })
  }


  
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

    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  
    console.log(this.andamento)
    console.log(this.cancelado)

    // new Chart(this.ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Em andamento', 'Cancelados', 'finalizado'],
    //     datasets: [{
    //       label: 'Total de chamados',
    //       data: [this.andamento, this.cancelado, this.finalizados],
    //       backgroundColor: colors,

    //     }],
    //   },
    //   options: {
    //     plugins: {
    //         legend: {
    //             display: false,
    //         }
    //     }
    // }
    // })

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['Em andamento', 'Cancelados', 'finalizado'],
        datasets: [{
          label: 'My First Dataset',
          data: [this.andamento, this.cancelado, this.finalizados],
          backgroundColor: colors,
          hoverOffset: 4
        }],
      },
    })
  }

}
