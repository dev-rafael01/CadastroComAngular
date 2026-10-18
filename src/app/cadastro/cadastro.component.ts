import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Cliente } from "./cliente";
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from "@angular/material/select";
import { BrasilapiService } from '../brasilapi.service';
import { CommonModule } from "@angular/common";
import { Cep } from '../brasil.models';


@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule, NgxMaskDirective,
    MatSelectModule, CommonModule,
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  private _snackBar = inject(MatSnackBar);
  cep?: Cep;


  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router

  ) {

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id)
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })
    this.carregarUFS();
  }



  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.monstraMensagem("Salvo com sucesso")
    }
    else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta'])
      this.monstraMensagem("Atualizado com sucesso")
    }
  }

  monstraMensagem(mensagem: string) {
    this._snackBar.open(mensagem, "ok")
  }

  carregarUFS() {
    this.brasilApiService.listaUfs('04476390').subscribe({
      next: dados => this.cep = dados,
      error: erro => console.error('Ocorreu um erro:', erro)
    });

  }
}
