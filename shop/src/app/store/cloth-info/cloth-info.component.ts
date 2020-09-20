import {Component, AfterViewInit, ViewChild, ViewChildren, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Cloth} from "../../models/cloth.model";
import {CartService} from "../../services/CartService";
import {ClothService} from "../../services/ClothService"; //additional
import {AlertComponent} from "../../shared-components/alert/alert.component";

@Component({
  selector: 'app-cloth-info',
  templateUrl: './cloth-info.component.html',
  styleUrls: ['./cloth-info.component.css']
})
export class ClothInfoComponent {
  @ViewChild(AlertComponent) childAlert: AlertComponent;

  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('chatModal') public chatModal;

  columns: number = 4;
  cloth: Cloth = null;

  alertMsg: string;
  isAlertSuccess: string;

  constructor(private cartService: CartService, private clothService: ClothService ){ //additional

  }

  //additional
  show(cloth) {
    this.cloth = cloth;
    this.childModal.show();

    this.cloth.numberOfViews = this.cloth.numberOfViews + 1;
    this.clothService.updateClothViews(this.cloth, function(res) { //additional
    /*  if (res.status === "error")
        self.showAlert(res.message, false);
      else
        self.showAlert("Item was updated", true);
        //self.setLoading.next(false);*/
    });

    var self = this;
    setTimeout(function () {
      self.chatModal.onOpenChat();
    });
  }

  hide() {
    this.childModal.hide();
  }

  onCloseClothInfo() {
    this.chatModal.onCloseChat();
  }

  onAddToCart() {
    var self = this;
    this.cartService.addToCart(this.cloth.id).subscribe(
      function (res) {
        self.showAlert("Item was added to cart", true);
      },
      function (err) {
        self.showAlert(err.error.message, false);
      }
    )
  }

  showAlert(msg, isSuccess) {
    this.alertMsg = msg;
    this.isAlertSuccess = isSuccess;

    this.childAlert.show();
  }
}
