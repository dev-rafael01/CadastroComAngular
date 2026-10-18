import { Routes } from '@angular/router';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ConsultarComponent } from "./consulta/consulta.component";

export const routes: Routes = [
  {path: 'cadastro', component: CadastroComponent},
  {path: 'consulta', component: ConsultarComponent}
];
