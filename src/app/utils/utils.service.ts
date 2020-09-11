import {
  Injectable
} from '@angular/core';
import {
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { AlertButton } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private alrtCtrl: AlertController, private toastCtrl: ToastController, private loadctrl: LoadingController) { }

  async presentAlert(header: string,
    message: string,
    buttons: AlertButton[],
    subHeader?: string,
    inputs?: [{}]) {

    let alrt = await this.alrtCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      inputs: inputs,
      cssClass: 'alertSupersize'

    })
    await alrt.present();

  }
  async presentLoading(text) {
    let loading = await this.loadctrl.create({
      spinner: 'circular',
      message: text,
      duration: 1000
    });

    await loading.present();
  }

  async loadingDismiss() {
    await this.loadctrl.dismiss();
  }
  async presentToast(text, duration, pos) {
    let loading = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: pos,
      cssClass: 'toastSupersize'
    });

    await loading.present();
  }

  formatDate(date) {
    let parsedDate: Date = new Date(date);
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];

    var day = parsedDate.getDate();
    var monthIndex = parsedDate.getMonth();
    var year = parsedDate.getFullYear();
    if (day < 10) {
      return '0' + day + '/' + monthNames[monthIndex] + '/' + year;

    } else {
      return day + '/' + monthNames[monthIndex] + '/' + year;
    }
  }
}