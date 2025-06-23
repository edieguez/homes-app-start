import {Injectable} from '@angular/core';
import {HousingLocation} from "./housing-location";

@Injectable({
    providedIn: 'root'
})
export class HousingService {
    private locationsUrl = "http://127.0.0.1:3000/locations";

    async getHousingLocationById(housingLocationId: number): Promise<HousingLocation> {
        const data = await fetch(`${this.locationsUrl}/${housingLocationId}`);
        return await data.json();
    }

    async fetchHousingLocationList(): Promise<HousingLocation[]> {
        const data = await fetch(this.locationsUrl);
        return await data.json() ?? [];
    }

    submitApplication(firstname: string, lastname: string, email: string) {
        console.log(`name ${firstname}, lastname: ${lastname}, email: ${email}`);
    }
}
