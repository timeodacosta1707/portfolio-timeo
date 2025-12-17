import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectCard } from '../project-card/project-card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface ProjectMedia {
	type: 'image' | 'video';
	url: string | SafeResourceUrl;
	thumbnailUrl?: string;
	isMaquette?: boolean;
	isGif?: boolean;
}

interface ProjectButton {
	label: string;
	link: string;
	type: 'primary' | 'secondary';
	disabled?: boolean
}

interface ProjectData {
	title: string;
	description: string;
	imageUrl: string;
	isMainImageMaquette?: boolean;
	client?: string;
	duration?: string;
	year?: string;
	role?: string;
	technologies: string[];
	gallery: ProjectMedia[];
	challenge?: string;
	buttons?: ProjectButton[];
}

type TrackType = 'top' | 'bottom' | null;

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [CommonModule, ProjectCard],
	templateUrl: './projects.html',
	styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {

	private sanitizer = inject(DomSanitizer);

	@ViewChild('trackTop') trackTop!: ElementRef<HTMLElement>;
	@ViewChild('trackBottom') trackBottom!: ElementRef<HTMLElement>;
	@ViewChild('thumbnailList') thumbnailList!: ElementRef<HTMLElement>;

	readonly CARD_WIDTH_DESKTOP = 550;
	readonly CARD_WIDTH_MOBILE = 300;
	readonly GAP = 40;

	allProjects: ProjectData[] = [
		{
			title: 'Site Touristique VPTours',
			description: 'Conception d\'un site web touristique statique en utilisant HTML/CSS/JS.',
			imageUrl: '/images/projets/VPTours/image1.png',
			client: "IUT de Meaux",
			technologies: ['HTML', 'CSS', 'JS', 'PHP', 'Git', 'GitHub'],
			gallery: [
				{ type: 'image', url: '/images/projets/VPTours/image2.png', isMaquette: false },
				{ type: 'image', url: '/images/projets/VPTours/image3.png', isMaquette: false },
				{ type: 'image', url: '/images/projets/VPTours/image4.png', isMaquette: false }
			],
			year: '2024 (1ère année de formation)',
			role: 'Développeur Front',
			duration: '4 semaines',
			buttons: [
				{ label: 'Visiter le site', link: 'https://vptours.alwaysdata.net/', type: 'primary' }
			]
		},
		{
			title: 'Saturne - Marque fictive Y2K',
			description: 'Réalisation d\'une marque de streetwear premium dans le style Y2K fictive. Ceci était un travail de groupe, nous avons donc réalisé des maquettes, un cahier des charges, un moodboard, une charte graphique et une arborescence.',
			imageUrl: '/images/projets/Saturne/image1.svg',
			technologies: ['Figma', 'Photoshop', 'Illustrator'],
			gallery: [
				{ type: 'image', url: '/images/projets/Saturne/image2.png', isMaquette: false },
				{ type: 'image', url: '/images/projets/Saturne/image3.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Saturne/image4.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Saturne/image5.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Saturne/image6.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Saturne/image7.png', isMaquette: true }
			],
			year: '2025 (2ème année de formation)',
			role: 'UX/UI Designer',
			duration: '2 mois',
			challenge: "Respecter la date de rendu du projet malgré la charge de travail. En effet, il a fallut réalisé cette entreprise fictive en partant de rien. Nons avons donc dû réfléchir à un logo, un nom d'entreprise, une DA à respecter etc... et tout cela en respectant les consignes fournies.",
			buttons: [
				{ label: "Voir les maquettes", link: 'https://www.figma.com/design/9WPgjBwQda9wWbQYONBFed/Saturne?node-id=0-1&p=f', type: 'primary' },
				{ label: "Cahier des charges", link: 'https://docs.google.com/spreadsheets/d/1ZPQzNm3lw4C16ZfRFlsgBE0Scrbt-QRVS7zRHI6CzFE/edit?gid=385970184#gid=385970184', type: 'secondary' }
			],
			client: "IUT de Meaux"
		},
		{
			title: 'Site de réservation de matériel',
			description: 'Conception d\'un site web dédié à la réservation de matériel et de salles de cours. L\'objectif était de remplacer un système organisationnel défaillant par une solution centralisée, permettant aux étudiants de planifier leurs projets universitaires en toute autonomie.',
			imageUrl: '/images/projets/Reservation/image1.png',
			technologies: ['HTML', 'CSS', 'JS', 'PHP', 'Bootstrap', 'MySQL', 'Git', 'GitHub'],
			gallery: [
				{ type: 'image', url: '/images/projets/Reservation/image2.png', isMaquette: false },
				{ type: 'image', url: '/images/projets/Reservation/image3.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Reservation/image4.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Reservation/image5.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Reservation/image6.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Reservation/image7.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Reservation/image8.png', isMaquette: true },
			],
			year: '2024 (1ère année de formation)',
			role: 'Dev. FS + Chef de projet',
			duration: '2 mois',
			client: "IUT de Meaux",
			challenge: "Lier une base de données à ce site était le challenge de ce projet. En effet, il était important de centraliser les données de sorte à pouvoir les récupérer de manière efficace et sécurisé pour faire fonctionner par exemple le système de connexion et d'inscription.",
			buttons: [
				{ label: "Voir le site", link: "https://gestiondesmateriel.alwaysdata.net/", type: "primary" }
			]
		},
		{
			title: 'Kinetic Animation',
			description: 'Réalisation d\'une animation kinetic sur la musique \'Dior - POP SMOKE\'',
			imageUrl: '/images/projets/Kinetic/image1.png',
			technologies: ['AfterEffects'],
			gallery: [
				{ type: 'video', url: 'https://app.videas.fr/embed/media/827c48b0-bf19-47e7-8ef8-2546b17ae18d/', thumbnailUrl: '/images/projets/Kinetic/image1.png' },
			],
			year: '2025 (2ème année de formation)',
			duration: '1 semaine'
		},
		{
			title: 'SAKANA - Application Web de restauration',
			description: 'Réalisation d\'une application Web de restauration de sushi. Ce projet avait pour but de réaliser une site internet afin de commander des sushis.',
			imageUrl: '/images/projets/Sakana/image1.svg',
			technologies: ['Angular', 'HTML', 'TypeScript', 'MySQL', 'PHP', 'Git', 'GitHub'],
			gallery: [
				{ type: 'image', url: '/images/projets/Sakana/image2.svg' },
				{ type: 'image', url: '/images/projets/Sakana/image3.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Sakana/image4.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Sakana/image5.png', isMaquette: true },
				{ type: 'image', url: '/images/projets/Sakana/image6.png' },
				{ type: 'image', url: '/images/projets/Sakana/image7.png' },
				{ type: 'image', url: '/images/projets/Sakana/image8.png' },
				{ type: 'image', url: '/images/projets/Sakana/image9.png' },
				{ type: 'image', url: '/images/projets/Sakana/image10.png' },
				{ type: 'image', url: '/images/projets/Sakana/image11.png' },
			],
			role: "UX/UI Designer + Dev FrontEnd",
			year: '2025 (2ème année de formation)',
			duration: '2 mois',
			buttons: [
				{ label: "Voir le site (A venir)", link: "A venir", type: "primary", disabled: true }
			]
		},
		{
			title: 'Blender - Pub Range Rover',
			description: 'Réalisation d\'une publicité pour la marque de voiture Range Rover. Ce projet était un projet purement personnel car le monde de la 3D m\'intrigue et m\a toujours passionné.',
			imageUrl: '/images/projets/RangeRover/image4.png',
			technologies: ['Blender'],
			gallery: [
				{ type: 'image', url: '/images/projets/RangeRover/image2.png' },
				{ type: 'image', url: '/images/projets/RangeRover/image3.png' },
				{ type: 'video', url: 'https://app.videas.fr/embed/media/b3d7b674-20d2-464b-b2b4-1ae6ce3c7ac5/', thumbnailUrl: "/images/projets/RangeRover/image1.png" },
			],
			year: '2024',
			duration: '4 jours',
		},
		{
			title: 'Dashboard prototypé v2',
			description: 'Réalisation d\'une maquette de dashbaord afin de gérer ses comptes bancaires. Ce projet a été réalisé seulement dans le but d\'améliorer mes compétences en UX/UI Design avec Figma.',
			imageUrl: '/images/projets/Dashboardv2/image1.png',
			technologies: ['Figma'],
			gallery: [
				{ type: 'image', url: '/images/projets/Dashboardv2/image2.png' },
			],
			year: '2024 (1ère année de formation)',
			client: 'IUT de Meaux',
			duration: '1 semaine',
			role: 'UX/UI Designer',
			buttons: [
				{ label: 'Voir les maquettes', link: "https://www.figma.com/design/yngEJ6UTT0H3C79rb33ITP/DACOSTA_Timeo_Maquette_Prototype?node-id=37-181&t=DMlVbQbkOlAwFMSv-1", type: 'primary' }
			]
		},
		{
			title: 'Dashboard prototypé',
			description: 'Réalisation d\'une maquette de dashbaord afin de voir le nombre de téléchargement d\'une application. Ce projet a été réalisé seulement dans le but d\'améliorer mes compétences en UX/UI Design avec Figma.',
			imageUrl: '/images/projets/Dashboard/image1.png',
			technologies: ['Figma'],
			gallery: [
				{ type: 'image', url: '/images/projets/Dashboard/image2.png' },
			],
			year: '2024 (1ère année de formation)',
			client: 'IUT de Meaux',
			duration: '1 semaine',
			role: 'UX/UI Design',
			challenge: 'Le challenge de ce projet était de prototypé cette maquette. En effet, lors de ce projet, je découvrais Figma et j\'ai essayé de prototypé cette maquette avant d\'avoir eu la formation pour le faire. Or, ce n\'était pas la bonne méthode... Comme vous pouvez le voir il y a un petit problème si vous aller sur le lien Figma ! Je me permets tout de même de le partager afin de voir mon évolution entre la première et la deuxième année de ma formation.',
			buttons: [
				{ label: 'Voir les maquettes', link: "https://www.figma.com/design/Kc5au4TZan3gSAkZefvl4U/Dashboard?node-id=0-1&t=1zs9yfDL504RjRwZ-1", type: 'primary' }
			]
		},
		{
			title: 'Webdocumentaire - Face Lumière',
			description: 'Réalisation d\'un site Webdocumentaire. En effet, nous avons réalisé ce site Internet en groupe de deux dans lequel nous exposons le sujet des énergies renouvelables. Nous avons réalisé une interview avec un professionnel qui exerce ce métier.',
			imageUrl: '/images/projets/Webdoc/image1.png',
			technologies: ['HTML', 'CSS', 'JS', 'Premier Pro', 'Photoshop', 'Illustrator', 'Git', 'GitHub', 'Bootstrap'],
			gallery: [
				{ type: 'image', url: '/images/projets/Webdoc/image2.png' },
				{ type: 'image', url: '/images/projets/Webdoc/image3.png' },
				{ type: 'image', url: '/images/projets/Webdoc/image4.png' },
				{ type: 'video', url: 'https://app.videas.fr/embed/media/702006d0-6c3c-471d-a32c-4af1d78902bc/', thumbnailUrl: "/images/projets/Webdoc/image1.png" },
			],
			year: '2024 (1ère année de formation)',
			client: 'IUT de Meaux',
			duration: '1 semaine',
			role: 'FrontEnd + Chef de projet',
			buttons: [
				{ label: 'Voir le site', link: "https://webdoc-energierenouvelable.vercel.app/", type: 'primary' }
			]
		},
		{
			title: 'Blender - Corvette Animation',
			description: 'Réalisation d\'une animation présentant une Corvette. Ce projet avait pour but d\'améliorer mes compétences en 3D.',
			imageUrl: '/images/projets/Corvette/image1.png',
			technologies: ['Blender'],
			gallery: [
				{ type: 'image', url: '/images/projets/Corvette/image2.png' },
				{ type: 'video', url: 'https://app.videas.fr/embed/media/11e52ddd-1ed4-41a8-9a96-b5db83bcd19e/', thumbnailUrl: '/images/projets/Corvette/image1.png' },
			],
			year: '2024',
			duration: '1 semaine',
		},
		{
			title: 'GIF - GTA VI',
			description: 'Réalisation d\'un GIF simulant GTA VI.',
			imageUrl: '/images/projets/Gif/image1.png',
			technologies: ['Photoshop'],
			gallery: [
				{ type: 'video', url: '/images/projets/Gif/video1.mp4', thumbnailUrl: '/images/projets/Gif/image1.png', isGif: true },
			],
			year: '2024 (1ère année de formation)',
			challenge: 'Le challenge de ce projet était d\'apprendre à faire un GIF sur Photoshop.',
			client: 'IUT de Meaux',
			duration: '2 jours',
			role: 'Designer',
		},
	];

	projectsTop: ProjectData[] = [];
	projectsBottom: ProjectData[] = [];

	selectedProject: ProjectData | null = null;

	activeGalleryMedia: ProjectMedia | null = null;
	projectMediaList: ProjectMedia[] = [];

	maquetteTransform: string = 'translateY(0)';

	speedBase = 0.5;
	resumeDelay = 1500;
	animationId: number | null = null;
	activeDragTrack: TrackType = null;
	startX = 0;

	resumeTimeoutTop: any;
	resumeTimeoutBottom: any;

	topTrackState = { pos: 0, direction: -1, isPaused: false, isHovered: false };
	bottomTrackState = { pos: 0, direction: 1, isPaused: false, isHovered: false };

	constructor(
		private ngZone: NgZone,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const mid = Math.ceil(this.allProjects.length / 2);
		this.projectsTop = this.allProjects.slice(0, mid);
		this.projectsBottom = this.allProjects.slice(mid);

		this.ensureInfiniteLoop(this.projectsTop, 'top');
		this.ensureInfiniteLoop(this.projectsBottom, 'bottom');

		this.route.queryParams.subscribe(params => {
			const projectName = params['project'];
			if (projectName) {
				const found = this.allProjects.find(p => p.title === projectName);
				if (found) {
					this.openProjectDetail(found);
					window.scrollTo(0, 0);
				}
			} else {
				this.selectedProject = null;
			}
		});
	}

	scrollThumbnails(direction: 'left' | 'right') {
		if (!this.thumbnailList?.nativeElement) return;

		const container = this.thumbnailList.nativeElement;
		const itemWidth = 100;
		const gap = 15;
		const scrollAmount = (itemWidth + gap) * 3;

		if (direction === 'left') {
			container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		} else {
			container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	ensureInfiniteLoop(list: ProjectData[], target: 'top' | 'bottom') {
		let safeList = [...list];
		while (safeList.length < 5) {
			safeList = [...safeList, ...list];
		}
		if (target === 'top') this.projectsTop = safeList;
		else this.projectsBottom = safeList;
	}

	ngAfterViewInit() {
		this.ngZone.runOutsideAngular(() => {
			this.animate();
		});
	}

	ngOnDestroy() {
		if (this.animationId) cancelAnimationFrame(this.animationId);
		clearTimeout(this.resumeTimeoutTop);
		clearTimeout(this.resumeTimeoutBottom);
	}

	animate() {
		if (this.selectedProject) {
			this.animationId = requestAnimationFrame(() => this.animate());
			return;
		}

		if (this.activeDragTrack !== 'top' && !this.topTrackState.isPaused && !this.topTrackState.isHovered) {
			if (this.trackTop) {
				this.topTrackState.pos += this.speedBase * this.topTrackState.direction;
				this.applyTransform(this.trackTop.nativeElement, this.topTrackState.pos, this.projectsTop.length);
			}
		}

		if (this.activeDragTrack !== 'bottom' && !this.bottomTrackState.isPaused && !this.bottomTrackState.isHovered) {
			if (this.trackBottom) {
				this.bottomTrackState.pos += this.speedBase * this.bottomTrackState.direction;
				this.applyTransform(this.trackBottom.nativeElement, this.bottomTrackState.pos, this.projectsBottom.length);
			}
		}
		this.animationId = requestAnimationFrame(() => this.animate());
	}

	onTrackHover(track: TrackType, isHovering: boolean) {
		if (this.activeDragTrack === track) return;

		if (track === 'top') {
			this.topTrackState.isHovered = isHovering;
		} else if (track === 'bottom') {
			this.bottomTrackState.isHovered = isHovering;
		}
	}

	applyTransform(element: HTMLElement, position: number, listLength: number) {
		if (!element) return;
		const isMobile = window.innerWidth <= 768;
		const itemWidth = isMobile ? this.CARD_WIDTH_MOBILE : this.CARD_WIDTH_DESKTOP;
		const singleSetWidth = (itemWidth + this.GAP) * listLength;

		if (Math.abs(position) >= singleSetWidth) position = 0;
		if (position > 0) position = -singleSetWidth;

		if (element === this.trackTop.nativeElement) this.topTrackState.pos = position;
		if (element === this.trackBottom.nativeElement) this.bottomTrackState.pos = position;

		element.style.transform = `translate3d(${position}px, 0, 0)`;
	}

	onMouseDown(event: MouseEvent, track: TrackType) { this.startDrag(event.clientX, track); }
	onTouchStart(event: TouchEvent, track: TrackType) { this.startDrag(event.touches[0].clientX, track); }

	startDrag(clientX: number, track: TrackType) {
		if (this.selectedProject) return;
		this.activeDragTrack = track;
		this.startX = clientX;

		if (track === 'top') {
			clearTimeout(this.resumeTimeoutTop);
			this.topTrackState.isPaused = true;
		} else if (track === 'bottom') {
			clearTimeout(this.resumeTimeoutBottom);
			this.bottomTrackState.isPaused = true;
		}
		document.body.style.cursor = 'grabbing';
	}

	onMouseMove(event: MouseEvent) { if (!this.activeDragTrack) return; this.moveDrag(event.clientX); }
	onTouchMove(event: TouchEvent) { if (!this.activeDragTrack) return; this.moveDrag(event.touches[0].clientX); }

	moveDrag(clientX: number) {
		const delta = clientX - this.startX;

		if (this.activeDragTrack === 'top') {
			this.topTrackState.pos += delta;
			if (this.trackTop) this.applyTransform(this.trackTop.nativeElement, this.topTrackState.pos, this.projectsTop.length);
		} else if (this.activeDragTrack === 'bottom') {
			this.bottomTrackState.pos += delta;
			if (this.trackBottom) this.applyTransform(this.trackBottom.nativeElement, this.bottomTrackState.pos, this.projectsBottom.length);
		}
		this.startX = clientX;
	}

	onMouseUp() {
		if (!this.activeDragTrack) return;
		const trackReleased = this.activeDragTrack;
		this.activeDragTrack = null;
		document.body.style.cursor = 'default';

		if (trackReleased === 'top') {
			this.resumeTimeoutTop = setTimeout(() => { this.topTrackState.isPaused = false; }, this.resumeDelay);
		} else if (trackReleased === 'bottom') {
			this.resumeTimeoutBottom = setTimeout(() => { this.bottomTrackState.isPaused = false; }, this.resumeDelay);
		}
	}

	navigateToProject(project: ProjectData) {
		this.router.navigate([], { relativeTo: this.route, queryParams: { project: project.title }, queryParamsHandling: 'merge' });
	}

	openProjectDetail(project: ProjectData) {
		this.selectedProject = project;

		const mainMedia: ProjectMedia = {
			type: 'image',
			url: project.imageUrl,
			isMaquette: project.isMainImageMaquette || false
		};

		const allMedia: ProjectMedia[] = [mainMedia];

		project.gallery.forEach(item => {
			if (item.url !== mainMedia.url) {
				if (item.type === 'video' && typeof item.url === 'string' && !item.isGif) {
					allMedia.push({
						...item,
						url: this.sanitizer.bypassSecurityTrustResourceUrl(item.url)
					});
				} else {
					allMedia.push(item);
				}
			}
		});

		this.projectMediaList = allMedia;
		this.setActiveMedia(mainMedia);

		window.scrollTo(0, 0);
	}

	closeProjectDetail() {
		this.selectedProject = null;
		this.router.navigate([], { relativeTo: this.route, queryParams: { project: null }, queryParamsHandling: 'merge' });
		window.scrollTo(0, 0);
	}

	setActiveMedia(media: ProjectMedia) {
		this.activeGalleryMedia = media;
		this.maquetteTransform = 'translateY(0)';
	}

	onMaquetteMouseMove(event: MouseEvent, container: HTMLElement) {
		if (window.innerWidth <= 1024) return;
		if (this.activeGalleryMedia?.type !== 'image' || !this.activeGalleryMedia?.isMaquette) return;

		const img = container.querySelector('.main-img') as HTMLElement;
		if (!img) return;

		const containerHeight = container.offsetHeight;
		const imgHeight = img.offsetHeight;

		if (imgHeight <= containerHeight) {
			this.maquetteTransform = 'translateY(0)';
			return;
		}

		const rect = container.getBoundingClientRect();
		const mouseY = event.clientY - rect.top;

		const percentage = Math.max(0, Math.min(1, mouseY / containerHeight));
		const maxTranslate = imgHeight - containerHeight;
		const translateValue = percentage * maxTranslate;

		this.maquetteTransform = `translateY(-${translateValue}px)`;
	}

	onMaquetteMouseLeave() {
		// this.maquetteTransform = 'translateY(0)';
	}
}