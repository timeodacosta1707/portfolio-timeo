import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-project-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './project-card.html',
	styleUrls: ['./project-card.scss']
})
export class ProjectCard implements AfterViewInit {
	@Input({ required: true }) title: string = '';
	@Input({ required: true }) description: string = '';
	@Input() imageUrl: string = '';

	@Output() viewDetails = new EventEmitter<void>();

	@ViewChild('descText') descText!: ElementRef<HTMLParagraphElement>;

	isTruncated = false;

	constructor(private cdr: ChangeDetectorRef) { }

	ngAfterViewInit() {
		this.checkTruncation();
		this.cdr.detectChanges();
	}

	checkTruncation() {
		if (this.descText) {
			const el = this.descText.nativeElement;
			this.isTruncated = el.scrollHeight > el.clientHeight;
		}
	}

	onViewDetails(event: Event) {
		event.preventDefault();
		this.viewDetails.emit();
	}
}