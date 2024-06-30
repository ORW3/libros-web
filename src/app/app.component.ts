import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ScriptService } from './services/script.service';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'libros';
  private routerSubscription: Subscription;
  constructor(private router: Router, private scriptService: ScriptService) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const editarLibroRegex = /^\/editar-libro\/[^\/]+$/;
        if (editarLibroRegex.test(event.urlAfterRedirects)) {
          const id = event.urlAfterRedirects.split('/').pop();
          console.log('ID del libro:', id);
          this.scriptService
            .loadScript('/assets/js/mondrian.js')
            .then(() => console.log('Hola Mondrian'))
            .catch((error) =>
              console.error('Error al cargar el script', error)
            );
        }
      });
  }

  menu() {
    this.router.navigate(['/listado-libros']);
  }

  agregar() {
    this.router.navigate(['/agregar-libros']);
  }

  sounds: string[] = [
    'assets/sound/16.wav',
    'assets/sound/17.wav',
    'assets/sound/26.wav',
    'assets/sound/30.wav',
    'assets/sound/35.wav',
    'assets/sound/38.wav',
    'assets/sound/45.wav',
    'assets/sound/62.wav',
  ];

  reproducirNota() {
    const randomIndex = Math.floor(Math.random() * this.sounds.length);
    const audio = new Audio(this.sounds[randomIndex]);
    audio.playbackRate = 0.2;
    audio.volume = 0.5;
    audio.play();
  }
}
