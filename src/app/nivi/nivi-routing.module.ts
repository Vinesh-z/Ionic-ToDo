import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NiviPage } from './nivi.page';

const routes: Routes = [
  {
    path: '',
    component: NiviPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NiviPageRoutingModule {}
