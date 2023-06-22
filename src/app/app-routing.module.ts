import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DogBreedsComponent } from './components/dog-breeds/dog-breeds.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dog-breeds/dog-breeds.component').then(
        (c) => c.DogBreedsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
