import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './contact.html',
	styleUrl: './contact.scss',
})
export class Contact {
	contactForm: FormGroup;
	email = "dacostatimeo@gmail.com";
	isSubmitting = false;
	formStatus: 'IDLE' | 'SUCCESS' | 'ERROR' = 'IDLE';

	socials: SocialLink[] = [
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/tim%C3%A9o-da-costa-078b15237/', icon: '/svg/icons/linkedin.svg' },
		{ name: 'GitHub', url: 'https://github.com/timeodacosta1707', icon: '/svg/icons/github.svg' },
	];

	constructor(private fb: FormBuilder) {
		this.contactForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			message: ['', Validators.required]
		});
	}

	async onSubmit() {
		if (this.contactForm.valid && !this.isSubmitting) {
			this.isSubmitting = true;

			const templateParams = {
				from_name: this.contactForm.value.name,
				user_email: this.contactForm.value.email,
				message: this.contactForm.value.message,
				to_name: 'Timéo'
			};

			try {
				await emailjs.send(
					'service_volmlf4',
					'template_4nlfsfa',
					templateParams,
					'fzwerqjK-xrZoDAyA'
				);

				this.formStatus = 'SUCCESS';
				this.contactForm.reset();
				this.isSubmitting = false;

			} catch (error) {
				console.error('Erreur d\'envoi:', error);
				this.formStatus = 'ERROR';
				this.isSubmitting = false;
			}
		} else {
			this.contactForm.markAllAsTouched();
		}
	}

	resetFormState() {
		this.formStatus = 'IDLE';
		this.isSubmitting = false;
	}
}