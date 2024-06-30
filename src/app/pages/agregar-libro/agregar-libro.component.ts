import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';


@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrl: './agregar-libro.component.css'
})
export class AgregarLibroComponent implements OnInit{

  //PROPIEDADES
  libroForm: FormGroup;
  enviado = false;
  libroGenero: any = [
    'Aventura', 'Biografía', 'Ciencia ficción', 'Ciencia', 'Clásicos', 'Cómics', 'Cuentos', 'Drama', 'Educación', 'Fantasía', 'Filosofía', 'Histórico', 'Infantil', 'Misterio', 'Novela', 'Poesía', 'Policiaco', 'Psicología', 'Romance', 'Salud', 'Suspenso', 'Tecnología', 'Terror', 'Viajes',
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private LibroService: LibroService
  ){
    this.mainForm();
  }

  ngOnInit(): void {
      
  }

  //método para generar el formulario
  mainForm(){
    this.libroForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      autor: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      fecha: ['',[Validators.required]]
    });
  }
  
  //método para asignar el genero seleccionado por el usuario
  actualizarGenero(g){
    this.libroForm.get('genero').setValue(g,{
      onlySelf:true,
    });
  }

  //getter para acceder a los controles del formulario
  get myForm() {
    return this.libroForm.controls;
  }
  
  //método para enviar el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.libroForm.valid){
      return false;
    } else {
      return this.LibroService.agregarLibro(this.libroForm.value).subscribe({
        complete: () => {
          console.log('Libro agregado correctamente')
          this.ngZone.run(()=>this.router.navigateByUrl('/listado-libros'));
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

}
