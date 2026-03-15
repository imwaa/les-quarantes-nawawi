import {Component, OnInit} from '@angular/core';
import {ModalController, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from "@ionic/angular/standalone";

@Component({
    selector: 'app-auteur',
    templateUrl: './auteur.component.html',
    styleUrls: ['./auteur.component.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class AuteurComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
