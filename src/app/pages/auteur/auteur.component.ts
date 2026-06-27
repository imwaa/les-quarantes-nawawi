import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonBackButton } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonContent, IonBackButton, TranslocoPipe]
})
export class AuteurComponent {}
