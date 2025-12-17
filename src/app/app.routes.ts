import { Routes } from '@angular/router';
import { Projects } from './components/projects/projects';
import { Accueil } from './components/accueil/accueil';
import { About } from './components/about/about';

export const routes: Routes = [
    {
        path: '',
        component: Accueil
    },
    {
        path: 'projects',
        component: Projects
    },
    {
        path: 'about',
        component: About
    }
];