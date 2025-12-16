import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Accueil } from './components/accueil/accueil';
import { Technologies } from './components/technologies/technologies';
import { Footer } from './components/footer/footer';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		Navbar,
		Accueil,
		Technologies,
		Footer
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	protected readonly title = signal('portfolio');
}
