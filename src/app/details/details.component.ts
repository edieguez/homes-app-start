import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
            Put your details for ID {{ this.housingLocationId }} here ♥️
        </p>
    `,
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingLocationId: Number;

    constructor() {
        this.housingLocationId = this.route.snapshot.params['id'];
    }
}
