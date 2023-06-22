import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
// services
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dog-breeds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-breeds.component.html',
  styleUrls: ['./dog-breeds.component.scss'],
})
export class DogBreedsComponent implements OnInit {
  dogBreeds$!: Observable<any>;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.dogBreeds$ = this.appService.getDogBreeds();
  }
}
