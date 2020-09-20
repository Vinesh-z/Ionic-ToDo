import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  now = new Date();

  constructor() { }

  idGenerate() {

    let text = '';
    for (let i = 0; i < 6; i++) {
      text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
    }
    text = text + this.now.getTime();
    return text;

  }
}
