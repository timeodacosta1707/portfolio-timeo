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
			name: "After Effects",
			icon: "/svg/icons/after-effects.svg",
			description: "En dehors du développement, After Effects est mon terrain de jeu créatif. Je l'utilise sur mon temps libre pour réaliser des projets de Motion Design et de composition vidéo, me permettant d'explorer une autre facette de la création numérique purement artistique."
		},
		{
			name: "Angular",
			icon: "/svg/icons/angular.svg",
			description: "Framework de référence pour le front-end, Angular est mon outil de prédilection pour créer des Single Page Applications (SPA). Il me permet de développer des interfaces fluides et réactives (via RxJS), offrant une navigation instantanée sans rechargement de page."
		},
		{
			name: "Blender",
			icon: "/svg/icons/blender.svg",
			description: "Blender est l'outil qui nourrit ma fascination pour la 3D. Je l'utilise exclusivement dans un cadre personnel pour explorer la modélisation et le rendu. C'est un univers qui me passionne par sa complexité et la possibilité de créer des mondes virtuels à partir de rien."
		},
		{
			name: "Bootstrap",
			icon: "/svg/icons/bootstrap.svg",
			description: "Pour garantir une expérience utilisateur fluide sur tous les écrans, je combine Bootstrap avec Angular. Ce duo me permet de créer des interfaces totalement \"responsive\" et robustes, en exploitant les classes utilitaires du framework CSS au sein de l'architecture modulaire d'Angular."
		},
		{
			name: "CSS",
			icon: "/svg/icons/css.svg",
			description: "CSS est essentiel pour aller au-delà des standards des frameworks. Je l'utilise (souvent via SCSS) pour surcharger les styles de Bootstrap et personnaliser mes composants Angular, créant ainsi des interfaces uniques qui respectent précisément la charte graphique du projet."
		},
		{
			name: "Figma",
			icon: "/svg/icons/figma.svg",
			description: "Figma me permet de visualiser le projet avant de le coder. Je m'en sers pour comprendre le flux utilisateur (user flow) et les interactions prévues, facilitant ainsi la communication avec les designers et l'anticipation de la logique à implémenter dans mes composants."
		},
		{
			name: "Git",
			icon: "/svg/icons/git.svg",
			description: "Git est le système de contrôle de version que j'utilise au quotidien en ligne de commande. Il me permet de sécuriser mon code, de gérer l'historique des modifications et de travailler proprement avec des branches pour isoler les nouvelles fonctionnalités."
		},
		{
			name: "GitHub",
			icon: "/svg/icons/github.svg",
			description: "GitHub est la plateforme où je centralise et héberge tous mes projets. Elle me sert de portfolio technique visible, me permettant de partager mon code, de documenter mes applications et de gérer le suivi des versions à distance."
		},
		{
			name: "GitLab",
			icon: "/svg/icons/gitlab.svg",
			description: "Dans une démarche de curiosité, j'ai exploré l'environnement GitLab pour en comprendre le fonctionnement. Je n'y héberge pas encore de projets, mais j'ai effectué des tests rapides de l'interface pour me familiariser avec cette alternative à GitHub."
		},
		{
			name: "HTML",
			icon: "/svg/icons/html.svg",
			description: "Plus qu'un simple balisage, HTML5 est le moteur de mes templates Angular. Je l'utilise pour structurer le DOM de manière rigoureuse, en y intégrant les directives et les bindings nécessaires pour connecter l'interface à la logique de l'application."
		},
		{
			name: "Illustrator",
			icon: "/svg/icons/illustrator.svg",
			description: "En complément de Photoshop, Illustrator me permet de gérer les éléments graphiques de l'identité visuelle (logos, pictogrammes). Je m'en sers pour préparer et exporter ces assets vectoriels afin de les rendre exploitables et performants dans mes projets web."
		},
		{
			name: "JavaScript",
			icon: "/svg/icons/javascript.svg",
			description: "Si HTML et CSS forment le corps, JavaScript en est l'esprit. Je l'utilise pour rendre les interfaces intelligentes et réactives, en transformant des pages statiques en expériences riches capables de réagir instantanément aux actions de l'utilisateur."
		},
		{
			name: "MySQL",
			icon: "/svg/icons/mysql.svg",
			description: "MySQL est le réservoir de données qui alimente mes API. Je l'utilise pour stocker l'information de manière structurée et sécurisée, permettant à mon Back-End de servir des données fiables et dynamiques à travers mes endpoints REST vers le client Angular."
		},
		{
			name: "NodeJS",
			icon: "/svg/icons/nodejs.svg",
			description: "En tant que développeur Angular, Node.js est le moteur de mon environnement de travail. Il est indispensable pour gérer mes packages via NPM, exécuter le CLI d'Angular et automatiser mes tâches de compilation et de build pour la mise en production."
		},
		{
			name: "Photoshop",
			icon: "/svg/icons/photoshop.svg",
			description: "Bien que ce soit un outil de design, Photoshop me permet d'être autonome sur la gestion des médias. Je l'utilise pour redimensionner rapidement des visuels, adapter des bannières ou effectuer des corrections mineures sans dépendre systématiquement d'une équipe créative."
		},
		{
			name: "PHP",
			icon: "/svg/icons/php.svg",
			description: "PHP est mon langage de référence pour le script côté serveur. Je l'utilise pour gérer les interactions sécurisées avec la base de données, l'authentification des utilisateurs et la génération dynamique de contenu, assurant la stabilité fonctionnelle de mes applications."
		},
		{
			name: "Premier Pro",
			icon: "/svg/icons/premier-pro.svg",
			description: "Premiere Pro est mon outil de prédilection pour le montage vidéo. Je l'utilise sur mon temps libre pour assembler des séquences, rythmer des récits et réaliser des projets personnels, ce qui me permet d'exprimer ma créativité à travers un autre média que le code."
		},
		{
			name: "Python",
			icon: "/svg/icons/python.svg",
			description: "J'apprécie Python pour sa polyvalence et sa puissance de calcul. C'est le langage que je privilégie pour tout ce qui touche au traitement de données et à l'algorithmique complexe, me permettant d'intégrer des fonctionnalités avancées au cœur de mes projets."
		},
		{
			name: "React",
			icon: "/svg/icons/react.svg",
			description: "Je consacre actuellement mon temps de veille à l'apprentissage de React. Je suis en phase de découverte pour ajouter une nouvelle corde à mon arc, avec pour ambition de transposer prochainement ces connaissances théoriques dans un premier projet concret."
		},
		{
			name: "SCSS",
			icon: "/svg/icons/scss.svg",
			description: "SCSS est mon préprocesseur de choix pour structurer le style. Grâce aux variables, à l'imbrication et aux mixins, je maintiens un code CSS modulaire et évolutif, ce qui est crucial pour gérer proprement le design de mes composants Angular."
		},
		{
			name: "TypeScript",
			icon: "/svg/icons/typescript.svg",
			description: "TypeScript est indissociable de ma pratique d'Angular. Ce sur-ensemble typé de JavaScript me permet de construire des architectures orientées objet solides (classes, interfaces), rendant le code de mes applications plus rigoureux et bien plus facile à maintenir."
		},
	];

	openModal(tech: Tech) {
		this.selectedTech = tech;
	}

	closeModal() {
		this.selectedTech = null;
	}
}