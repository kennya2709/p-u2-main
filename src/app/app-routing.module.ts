import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './view/lista-productos/lista-productos.component';
import { UserListComponent } from './view/user-list/user-list.component';

const routes: Routes = [
  { path: 'product', component: ListaProductosComponent },
  { path: 'user', component: UserListComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/product' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }