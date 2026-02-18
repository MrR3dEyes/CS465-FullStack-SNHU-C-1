import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';



@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips: any[] = [];
  message = '';

  constructor(
    private tripDataService: TripData,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any[]) => {
        // Update trips after API call
        this.ngZone.run(() => {
          this.trips = [...value];

          this.message = value.length
            ? `There are ${value.length} trips available.`
            : 'There were no trips retrieved from the database';

          console.log(this.message);
          this.cdr.detectChanges();
        });
      },
      error: (error: any) => console.log('Error: ' + error)
    });
  }

  // Track items by MongoDB id
  trackById(index: number, trip: any): string {
    return trip._id;
  }

  public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
}



  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public editTrip(trip: any): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: any): void {
  const ok = confirm(`Delete trip ${trip.code}?`);
  if (!ok) {
    return;
  }

  this.tripDataService.deleteTrip(trip.code).subscribe({
    next: () => {
      this.trips = this.trips.filter(t => t.code !== trip.code);
      this.cdr.detectChanges();
    },
    error: (error: any) => console.log('Error: ' + error)
  });
}




  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
