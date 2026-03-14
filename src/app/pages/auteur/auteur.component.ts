import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-auteur',
    templateUrl: './auteur.component.html',
    styleUrls: ['./auteur.component.scss'],
    standalone: false
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
