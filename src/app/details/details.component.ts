import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housing-location";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <article>
            <img [src]="housingLocation?.photo" alt="House photo" class="listing-photo">
            <section class="listing-description">
                <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
                <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
            </section>
            <section class="listing-features">
                <h2 class="section-heading">About this housing location</h2>
                <ul>
                    <li>Units available: {{ housingLocation?.availableUnits }}</li>
                    <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
                    <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
                </ul>
            </section>
            <section class="listing-apply">
                <h2 class="section-heading">Apply now to live here</h2>
                <form [formGroup]="applyForm" (submit)="submitApplication()">
                    <label for="first-name">Firstname</label>
                    <input type="text" formControlName="firstname" id="first-name">

                    <label for="last-name">Lastname</label>
                    <input type="text" formControlName="lastname" id="last-name">

                    <label for="email">Email</label>
                    <input type="text" formControlName="email" id="email">

                    <button type="submit" class="primary">Apply now</button>
                </form>
            </section>
        </article>
    `,
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingService: HousingService = inject(HousingService);
    housingLocation: HousingLocation | undefined;
    applyForm: FormGroup = new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        email: new FormControl(''),
    });

    constructor() {
        const housingLocationId = this.route.snapshot.params["id"];
        this.housingService.getHousingLocationById(housingLocationId).then(
            (housingLocation: HousingLocation) => this.housingLocation = housingLocation
        );
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstname ?? '',
            this.applyForm.value.lastname ?? '',
            this.applyForm.value.email ?? '',
        );
    }
}
