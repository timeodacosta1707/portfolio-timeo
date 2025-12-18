import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, CommonModule],
	templateUrl: './navbar.html',
	styleUrl: './navbar.scss',
})
export class Navbar {
	isMenuOpen = false;

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;

		if (this.isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}

	closeMenu() {
		this.isMenuOpen = false;
		document.body.style.overflow = 'auto';
	}
}