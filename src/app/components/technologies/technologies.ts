import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tech {
	name: string;
	icon: string;
	description: string;
}

@Component({
	selector: 'app-technologies',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './technologies.html',
	styleUrl: './technologies.scss',
})
export class Technologies {
	selectedTech: Tech | null = null;

	technologies: Tech[] = [
		{
			name: "Angular",
			icon: "/svg/icons/angular.svg",
			description: "Framework open-source puissant développé par Google. Je l'utilise pour créer des Single Page Applications (SPA) structurées, maintenables et performantes."
		},
		{
			name: "Bootstrap",
			icon: "/svg/icons/bootstrap.svg",
			description: "Framework CSS populaire qui me permet de prototyper et développer rapidement des sites web responsives grâce à sa grille flexible et ses composants préconçus."
		},
		{
			name: "CSS",
			icon: "/svg/icons/css.svg",
			description: "Langage fondamental pour le design web. Je l'utilise pour donner vie aux maquettes, gérer la mise en page responsive et créer des identités visuelles uniques."
		},
		{
			name: "Figma",
			icon: "/svg/icons/figma.svg",
			description: "Mon outil de prédilection pour le design d'interface (UI) et l'expérience utilisateur (UX). Il me permet de créer des maquettes interactives et de collaborer efficacement."
		},
		{
			name: "HTML",
			icon: "/svg/icons/html.svg",
			description: "Le squelette de tout projet web. Je maîtrise sa structure sémantique pour assurer une accessibilité optimale et un bon référencement naturel (SEO)."
		},
		{
			name: "Illustrator",
			icon: "/svg/icons/illustrator.svg",
			description: "Logiciel de création vectorielle d'Adobe. Je l'utilise pour concevoir des logos, des icônes et des éléments graphiques qui conservent une qualité parfaite à toute échelle."
		},
		{
			name: "JavaScript",
			icon: "/svg/icons/javascript.svg",
			description: "Le langage qui rend le web vivant. Je l'utilise pour créer de l'interactivité, manipuler le DOM et gérer la logique côté client de mes applications."
		},
		{
			name: "NodeJS",
			icon: "/svg/icons/nodejs.svg",
			description: "Environnement d'exécution JavaScript côté serveur. Il me permet de développer des back-ends rapides et scalables en utilisant le même langage que pour le front-end."
		},
		{
			name: "PHP",
			icon: "/svg/icons/php.svg",
			description: "Langage de script serveur robuste. Je l'utilise pour interagir avec des bases de données et créer des sites dynamiques personnalisés."
		},
		{
			name: "Python",
			icon: "/svg/icons/python.svg",
			description: "Langage polyvalent connu pour sa clarté. Je m'y intéresse pour le développement back-end, l'automatisation de tâches et le traitement de données."
		},
		{
			name: "React",
			icon: "/svg/icons/react.svg",
			description: "Bibliothèque JavaScript développée par Facebook. Je l'apprécie pour sa flexibilité et son approche basée sur les composants pour construire des interfaces utilisateurs modernes."
		},
		{
			name: "TypeScript",
			icon: "/svg/icons/typescript.svg",
			description: "Sur-ensemble typé de JavaScript. Je l'utilise pour sécuriser mon code, éviter les erreurs courantes et faciliter la maintenance des projets complexes."
		},
	];

	openModal(tech: Tech) {
		this.selectedTech = tech;
	}

	closeModal() {
		this.selectedTech = null;
	}
}