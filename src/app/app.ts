import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Navbar } from './components/navbar/navbar';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		Accueil,
		Navbar
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	protected readonly title = signal('portfolio');
}
