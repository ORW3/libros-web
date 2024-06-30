import { Component } from '@angular/core';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-listado-libros',
  templateUrl: './listado-libros.component.html',
  styleUrl: './listado-libros.component.css'
})
export class ListadoLibrosComponent {

  //propiedades:
  libros:any = [];

  constructor(private libroService:LibroService){
    this.getLibros();
  }

  ngOnInit(): void {
      
  }

  //metodo para obtener a todos los libros
  getLibros() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }
  
  //método para eliminar un libro
  eliminarLibro(libro, index){
    if(window.confirm('¿Estás seguro que lo deseas eliminar?')){
      this.libroService.deleteLibro(libro._id)
        .subscribe((data) => {
          this.libros.splice(index,1);
        })
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  
}
