import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Accueil } from './components/accueil/accueil';
import { Technologies } from './components/technologies/technologies';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		Navbar,
		Accueil,
		Technologies
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	protected readonly title = signal('portfolio');
}
