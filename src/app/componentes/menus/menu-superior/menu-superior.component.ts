import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')
  url: any = localStorage.getItem('page')

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.router.navigate(['login'])
    localStorage.clear()
  }


  openAdmin(page: any){
    localStorage.setItem('page', page)
    this.router.navigate(['area-administrativa'])
  }
}
