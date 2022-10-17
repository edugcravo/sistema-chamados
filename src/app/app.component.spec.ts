import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GerarChamadoComponent } from './componentes/gerar-chamado/gerar-chamado.component';

//grupo
describe('AppComponent', () => {
  //antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  //testando a criação do componente
  it('deve criar o aplicativo', () => {
    //criando o componente
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //o que o teste espera que aconteça
    expect(app).toBeTruthy();
  });

  //Verifica se o titulo é chamados-FRONT
  it(`verifica se o titulo 'chamados-FRONT'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chamados-FRONT');
    //esperando que o titulo do component app seja igual chamados-FRONT
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('chamados-FRONT app is running!');
  // });
});
