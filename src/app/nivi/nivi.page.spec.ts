import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NiviPage } from './nivi.page';

describe('NiviPage', () => {
  let component: NiviPage;
  let fixture: ComponentFixture<NiviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiviPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
