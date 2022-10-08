import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NiviPageRoutingModule } from './nivi-routing.module';

import { NiviPage } from './nivi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NiviPageRoutingModule
  ],
  declarations: [NiviPage]
})
export class NiviPageModule {}
