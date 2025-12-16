import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-accueil',
	imports: [],
	templateUrl: './accueil.html',
	styleUrl: './accueil.scss',
})
export class Accueil implements OnInit {
	age!: number;

	ngOnInit(): void {
		this.calculateAge();
	}

	scrollToTechnologies() {
		const element = document.getElementById('technologies');

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	calculateAge() {
		const birthDate = new Date('2006-07-17');
		const today = new Date();

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		this.age = age;
	}
}
