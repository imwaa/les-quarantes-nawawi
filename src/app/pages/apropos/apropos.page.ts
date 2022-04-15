import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {


  constructor(
    private modalCtr: ModalController,
  ) { }

  ngOnInit() { }



}
