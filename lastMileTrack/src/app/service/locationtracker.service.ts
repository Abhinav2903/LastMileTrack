import { Injectable } from '@angular/core';
import { PermissionState } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class LocationtrackerService {
  permissionStatus: any;
  position: any;

  constructor(private toastController: ToastController) {}

  async checkPermission() {
    try {
      const permissionChk = await Geolocation.checkPermissions();

      switch (permissionChk.location) {
        case 'denied':
          const permissionResult = await Geolocation.requestPermissions();
          this.permissionStatus = permissionResult.location;
          if (this.permissionStatus.location === 'granted') {
            return this.userLocation();
          }
          break;
        case 'prompt':
        case 'prompt-with-rationale':
          await Geolocation.requestPermissions();
          return this.userLocation();
        case 'granted':
          return this.userLocation();
      }
    } catch (err) {
      console.log(err);
      return (0)
    }
  }

  async userLocation() {
    try {
      this.position = (await Geolocation.getCurrentPosition()).coords;
      return this.position;
    } catch (err) {
      console.log(err);
      const toast = await this.toastController.create({
        message: 'Please enable GPS for accurate location detection.',
        duration: 3000,
        position: 'bottom',
        buttons: [
          {
            text: 'Settings',
            handler: () => {
              // Open device settings to enable GPS
              // You may need to use a plugin or a platform-specific code for this
              // Example: this.openDeviceSettings();
            },
          },
        ],
      });
      toast.present();
      return this.position;
    }
  }
}
