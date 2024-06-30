import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgregarLibroComponent } from './pages/agregar-libro/agregar-libro.component';
import { ListadoLibrosComponent } from './pages/listado-libros/listado-libros.component';
import { EditarLibroComponent } from './pages/editar-libro/editar-libro.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarLibroComponent,
    ListadoLibrosComponent,
    EditarLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
