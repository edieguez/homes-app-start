import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {HousingLocation} from "../housing-location";
import {HousingService} from "../housing.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    template: `
        <section>
            <input #filter type="text" placeholder="Filter by city">
            <button class="primary" (click)="filterHousingLocations(filter.value)">Search</button>
        </section>
        <section class="results">
            <app-housing-location *ngFor="let housingLocation of filteredHousingLocations"
                                  [housingLocation]="housingLocation"></app-housing-location>
        </section>
    `,
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    housingService: HousingService = inject(HousingService);
    housingLocationList: HousingLocation[] = [];
    filteredHousingLocations: HousingLocation[] = [];

    constructor() {
        this.housingService.fetchHousingLocationList().then(
            (housingLocations: HousingLocation[]) => {
                this.housingLocationList = housingLocations;
                this.filteredHousingLocations = housingLocations;
            },
        );
    }

    filterHousingLocations(searchText: string) {
        if (searchText) {
            this.filteredHousingLocations = this.housingLocationList.filter((housingLocation: HousingLocation) => {
                return housingLocation?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
                    housingLocation?.city.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
                    housingLocation?.state.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
            });
        } else {
            this.filteredHousingLocations = this.housingLocationList;
        }
    }
}
