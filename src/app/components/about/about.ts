import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
	year: string;
	title: string;
	location?: string;
	description: string;
}

export interface VisionItem {
	number: string;
	title: string;
	description: string;
}

export interface InterestItem {
	id: string;
	topic: string;
	label: string;
	text: string;
	images: string[];
}

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {

	bioTitle = "PASSIONNÉ PAR LE DEV";
	bioDescription = `Je m'appelle Timéo, je suis un développeur web et designer passionné par la création d'expériences numériques immersives. 
    Mon approche combine une rigueur technique avec une sensibilité artistique forte.
    
    Toujours en quête de nouvelles technologies, j'aime explorer les frontières entre le code et le design.`;

	timelineData: TimelineItem[] = [
		{
			year: '2022',
			title: 'Début de la passion',
			description: 'Découverte du code et du graphisme en autodidacte.',
		},
		{
			year: '2023',
			title: 'Baccalauréat Général',
			location: 'Lycée Henri Moissan',
			description: 'Spécialités Mathématiques et NSI, Mention Assez Bien.'
		},
		{
			year: '2024',
			title: 'Début de la formation MMI',
			location: 'IUT de Meaux',
			description: 'Formation polyvalente couvrant le développement web (Fullstack) et le design.'
		},
		{
			year: 'Été 2025',
			title: 'Stage',
			location: 'CCK\'BTP',
			description: 'Réalisation de leur site internet afin d\'améliorer leur présence en ligne.'
		},
		{
			year: 'En cours...',
			title: 'Deuxième année de la formation',
			location: 'IUT de Meaux',
			description: 'Cela fait maintenant un an et demi que je suis dans cette formation'
		},
	];

	visionData: VisionItem[] = [
		{
			number: '01',
			title: 'IMMERSION',
			description: "Le design n'est pas juste visuel, il est ressenti. Je crée des interfaces qui captent l'attention dès la première seconde."
		},
		{
			number: '02',
			title: 'PERFORMANCE',
			description: "Un beau site inutile est un échec. J'optimise chaque ligne de code pour une fluidité sans faille et une accessibilité maximale."
		},
		{
			number: '03',
			title: 'PRÉCISION',
			description: "Le diable est dans les détails. De l'alignement au pixel près aux micro-interactions, rien n'est laissé au hasard."
		}
	];

	interestsData: InterestItem[] = [
		{
			id: 'gaming',
			topic: 'Gaming',
			label: 'COMPÉTITION',
			text: `Passionné par l'exigence des FPS tactiques comme Valorant, j'aime la précision et la vision de jeu nécessaire pour renverser une partie. Cette approche stratégique se retrouve aussi dans mon attrait pour les simulations de sport comme FIFA, où la gestion du tempo et l'analyse de l'adversaire sont primordiales. Pour moi, le jeu vidéo est un terrain de performance où la réactivité technique rencontre la réflexion collective.`,
			images: [
				'/images/about/valorant.jpg',
				'/images/about/fifa.jpg',
			]
		},
		{
			id: 'music',
			topic: 'Musique',
			label: 'INSPIRATION',
			text: 'La musique est le moteur de ma productivité et de ma créativité. Très influencé par la scène Rap Français, j\'apprécie particulièrement l\'énergie de Werenoi ou le flow percutant de SDM pour rythmer mes sessions de design et de développement. Pour moi, la structure d\'un morceau et la précision d\'une punchline font écho à la rigueur du code : chaque détail compte pour créer un impact maximal.',
			images: [
				'/images/about/werenoi.jpg',
				'/images/about/sdm.jpg',
			]
		},
		{
			id: 'tech',
			topic: 'sport',
			label: 'PERSEVERANCE',
			text: 'Le sport est mon équilibre indispensable. Passionné de football depuis toujours, j\'aime l\'aspect stratégique et collectif du jeu, que ce soit sur le terrain ou en analyse. Parallèlement, je m\'intéresse de près à la boxe, une discipline qui m\'inspire par son exigence mentale, sa gestion du stress et sa rigueur physique. Ces deux univers me poussent à cultiver une mentalité de compétiteur et une persévérance que j\'applique quotidiennement dans mes défis techniques.',
			images: [
				'/images/about/football.jpg',
				'/images/about/boxe.jpg',
			]
		}
	];

	downloadCV(): void {
		const link = document.createElement('a');
		link.href = '/PDF/CV_Timeo_DACOSTA.pdf';
		link.download = 'CV_Timeo_DACOSTA.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}