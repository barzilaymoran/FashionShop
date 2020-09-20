import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/UserService";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared-components/alert/alert.component";
import {User} from '../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @ViewChild(AlertComponent) childAlert: AlertComponent;
    loading: boolean = false;

    fullName: string;
    city: string;
    address: string;

    //validPassword: boolean = true;

    alertMsg: string;
    isAlertSuccess: boolean;

    constructor(private userService: UserService, private router: Router) {
      var self = this;
        userService.event.subscribe(function(value) {
            self.setUserData(value.user);
        });
    }

    ngOnInit() {
        var user = this.userService.user;
        this.setUserData(user);
    }

    setUserData(user) {
        this.fullName = (user) ? user.fullName : "";
        this.city = (user) ? user.city : "";
        this.address = (user) ? user.address : "";
    }

    showAlert(msg, isSuccess) {
        this.alertMsg = msg;
        this.isAlertSuccess = isSuccess;

        this.childAlert.show();
    }

    onChangeProfile() {
        var data = {
            fullName: this.fullName,
            city: this.city,
            address: this.address
        };

        var self = this;
        this.userService.updateProfile(data).subscribe(
            function(res) {
                self.showAlert("Your profile is updated", true);
                self.loading = false;
            },
            function(err) {
                self.showAlert(err.error.message, false);
                self.loading = false;
            }
        )
    }


    onLogout() {
      var self = this;
        this.userService.logout(function() {
            self.router.navigate(['./store']);
        });
    }
}
