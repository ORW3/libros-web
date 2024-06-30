import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarLibroComponent } from './pages/agregar-libro/agregar-libro.component';
import { ListadoLibrosComponent } from './pages/listado-libros/listado-libros.component';
import { EditarLibroComponent } from './pages/editar-libro/editar-libro.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'agregar-libros'},
  {path:'agregar-libros',
    component:AgregarLibroComponent
  },
  {path:'listado-libros',
    component:ListadoLibrosComponent
  },
  {path: 'editar-libro/:id',
    component:EditarLibroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
