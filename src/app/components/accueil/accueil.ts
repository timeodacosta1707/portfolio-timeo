import { Component } from '@angular/core';

@Component({
	selector: 'app-accueil',
	imports: [],
	templateUrl: './accueil.html',
	styleUrl: './accueil.scss',
})
export class Accueil {
	scrollToTechnologies() {
		const element = document.getElementById('technologies');

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
}
