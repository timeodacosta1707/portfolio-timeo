import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  year: string;
  title: string;
  location?: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

  bioTitle = "PASSIONNÉ PAR LE DIGITAL";
  bioDescription = `Je m'appelle Timéo, je suis un développeur web et designer passionné par la création d'expériences numériques immersives. 
    Mon approche combine une rigueur technique avec une sensibilité artistique forte.
    
    Toujours en quête de nouvelles technologies, j'aime explorer les frontières entre le code et le design.`;

  timelineData: TimelineItem[] = [
    {
      year: '2025',
      title: 'Alternance / Stage',
      location: 'Entreprise à définir',
      description: 'Recherche active d\'une opportunité pour mettre en pratique mes compétences.'
    },
    {
      year: '2023 - 2025',
      title: 'BUT MMI',
      location: 'IUT de Meaux',
      description: 'Formation polyvalente couvrant le développement web (Fullstack) et le design.'
    },
    {
      year: '2023',
      title: 'Baccalauréat Général',
      location: 'Lycée...',
      description: 'Spécialités Mathématiques et NSI, Mention Bien.'
    },
    {
      year: '2020',
      title: 'Début de la passion',
      description: 'Découverte du code et du graphisme en autodidacte.'
    }
  ];
}