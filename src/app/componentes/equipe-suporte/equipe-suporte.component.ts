import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-equipe-suporte',
  templateUrl: './equipe-suporte.component.html',
  styleUrls: ['./equipe-suporte.component.css']
})
export class EquipeSuporteComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')
  tecnicos: any;
  

  constructor(private router: Router, private chamadosService: ChamadosService, private _sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.obterTodosTecnicos()
  }


  obterTodosTecnicos(){
    this.chamadosService.retorna_todos_tecnicos().then((data: any) =>{
      this.tecnicos = data
      console.log(data)

      for(let item of this.tecnicos){
        item.img_perfil = this._sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + item.img_perfil)
      }
      
    
  })
}

}
