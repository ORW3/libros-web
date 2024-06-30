import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent implements OnInit {
  libroForm: FormGroup;
  enviado = false;
  libroGenero: any = [
    'Aventura', 'Biografía', 'Ciencia ficción', 'Ciencia', 'Clásicos', 'Cómics', 'Cuentos', 'Drama', 'Educación', 'Fantasía', 'Filosofía', 'Histórico', 'Infantil', 'Misterio', 'Novela', 'Poesía', 'Policiaco', 'Psicología', 'Romance', 'Salud', 'Suspenso', 'Tecnología', 'Terror', 'Viajes',
  ];
  
  libroData: Libro[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private LibroService: LibroService
  ) {}

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getLibro(id);
  }

  mainForm() {
    this.libroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  actualizarGenero(g) {
    this.libroForm.get('genero').setValue(g, {
      onlySelf: true,
    });
  }

  get myForm() {
    return this.libroForm.controls;
  }

  getLibro(id) {
    this.LibroService.getLibro(id)
      .subscribe((data) => {
        this.libroForm.setValue({
          nombre: data['nombre'],
          autor: data['autor'],
          genero: data['genero'],
          fecha: this.formatDate(data['fecha']),
        });
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    this.enviado = true;
    if (!this.libroForm.valid) {
      return false;
    } else {
      if (window.confirm('¿Estás seguro que lo deseas modificar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.LibroService.updateLibro(id, this.libroForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listado-libros');
              console.log('Se actualizó correctamente');
            },
            error: (e) => {
              console.log(e);
            }
          });
      }
    }
  }

  /** */

  
}
