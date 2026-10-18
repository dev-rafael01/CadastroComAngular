import { Component, inject } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatButton } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar'



@Component({
  selector: 'app-consultar',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule, FormsModule,
    MatTableModule, MatButton,
    CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultarComponent {

  nomeBusca: string = '';
  ListaClientes: Cliente[] = [];
  colunastable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "cep", "acoes"];
  private _snackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {

  }

  ngOnInit() {
    this.ListaClientes = this.service.pesquisarCliente("");
  }

  pesquisar() {
    this.ListaClientes = this.service.pesquisarCliente(this.nomeBusca)
  }

  preparaEditar(id: string) {
    console.groupCollapsed("ID RECEBIDO ", id)

    this.router.navigate(["/cadastro"], { queryParams: { "id": id } })
  }

  preparaDelete(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.ListaClientes = this.service.pesquisarCliente('');
    this.monstraMensagemDelete("Deletado com sucesso!")
  }

  monstraMensagemDelete(mensagem: string) {
    this._snackBar.open(mensagem, "ok")
  }

}
