import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectCard } from '../project-card/project-card';

export interface ProjectImage {
	url: string;
	isMaquette: boolean;
}

interface ProjectButton {
	label: string;
	link: string;
	type: 'primary' | 'secondary';
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
	gallery: ProjectImage[];
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

	@ViewChild('trackTop') trackTop!: ElementRef<HTMLElement>;
	@ViewChild('trackBottom') trackBottom!: ElementRef<HTMLElement>;

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
				{ url: '/images/projets/VPTours/image2.png', isMaquette: false },
				{ url: '/images/projets/VPTours/image3.png', isMaquette: false },
				{ url: '/images/projets/VPTours/image4.png', isMaquette: false }
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
				{ url: '/images/projets/Saturne/image2.png', isMaquette: false },
				{ url: '/images/projets/Saturne/image3.png', isMaquette: true },
				{ url: '/images/projets/Saturne/image4.png', isMaquette: true },
				{ url: '/images/projets/Saturne/image5.png', isMaquette: true },
				{ url: '/images/projets/Saturne/image6.png', isMaquette: true },
				{ url: '/images/projets/Saturne/image7.png', isMaquette: true }
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
			title: 'Dashboard Admin',
			description: 'Data visualization.',
			imageUrl: 'assets/images/projet3.jpg',
			technologies: ['React', 'D3.js'],
			gallery: [{ url: 'assets/images/projet3.jpg', isMaquette: false }],
			year: '2023',
			role: 'Fullstack',
			duration: '4 mois'
		},
		{
			title: 'E-commerce Shop',
			description: 'Vente en ligne.',
			imageUrl: 'assets/images/projet4.svg',
			technologies: ['Shopify', 'Liquid'],
			gallery: [{ url: 'assets/images/projet4.jpg', isMaquette: false }],
			year: '2024',
			role: 'Frontend',
			duration: '1 mois'
		}
	];

	projectsTop: ProjectData[] = [];
	projectsBottom: ProjectData[] = [];

	selectedProject: ProjectData | null = null;

	activeGalleryImage: ProjectImage | null = null;
	projectImages: ProjectImage[] = [];

	maquetteTransform: string = 'translateY(0)';

	speedBase = 0.5;
	resumeDelay = 1500;
	animationId: number | null = null;
	activeDragTrack: TrackType = null;
	startX = 0;

	resumeTimeoutTop: any;
	resumeTimeoutBottom: any;

	topTrackState = { pos: 0, direction: -1, isPaused: false };
	bottomTrackState = { pos: 0, direction: 1, isPaused: false };

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

		if (this.activeDragTrack !== 'top' && !this.topTrackState.isPaused) {
			if (this.trackTop) {
				this.topTrackState.pos += this.speedBase * this.topTrackState.direction;
				this.applyTransform(this.trackTop.nativeElement, this.topTrackState.pos, this.projectsTop.length);
			}
		}

		if (this.activeDragTrack !== 'bottom' && !this.bottomTrackState.isPaused) {
			if (this.trackBottom) {
				this.bottomTrackState.pos += this.speedBase * this.bottomTrackState.direction;
				this.applyTransform(this.trackBottom.nativeElement, this.bottomTrackState.pos, this.projectsBottom.length);
			}
		}
		this.animationId = requestAnimationFrame(() => this.animate());
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

		const mainImg: ProjectImage = {
			url: project.imageUrl,
			isMaquette: project.isMainImageMaquette || false
		};

		const allImages: ProjectImage[] = [mainImg];
		project.gallery.forEach(img => {
			if (img.url !== mainImg.url) {
				allImages.push(img);
			}
		});

		this.projectImages = allImages;
		this.setActiveImage(mainImg);

		window.scrollTo(0, 0);
	}

	closeProjectDetail() {
		this.selectedProject = null;
		this.router.navigate([], { relativeTo: this.route, queryParams: { project: null }, queryParamsHandling: 'merge' });
		window.scrollTo(0, 0);
	}

	setActiveImage(img: ProjectImage) {
		this.activeGalleryImage = img;
		this.maquetteTransform = 'translateY(0)';
	}

	onMaquetteMouseMove(event: MouseEvent, container: HTMLElement, img: HTMLElement) {
		if (window.innerWidth <= 1024) return;
	
		if (!this.activeGalleryImage?.isMaquette) return;
	
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