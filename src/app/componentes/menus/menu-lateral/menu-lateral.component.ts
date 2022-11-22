import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  tecnico: any = localStorage.getItem('tecnico');
  usuario: any = localStorage.getItem('usuario');

  constructor(private router: Router) { }

  ngOnInit() {
  }


  pagina(page: any){
    localStorage.setItem('page', page)
  }

}
