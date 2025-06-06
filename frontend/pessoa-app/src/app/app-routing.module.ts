import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'pessoas/nova', component: PessoaFormComponent },
  { path: 'pessoas/editar/:id', component: PessoaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 