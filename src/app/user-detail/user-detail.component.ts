import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('the user ID is', this.userId);

    this.getUserById();
  }

  getUserById() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
        console.log('received user: ', this.user);
      });
  }

  editAddress(){
    console.log('test edit Address');
    const dialogRef = this.dialog.open(DialogEditAddressComponent, { disableClose: true });
    dialogRef.componentInstance.user = new User(this.user);
    dialogRef.componentInstance.userId = this.userId;
    
  }

  editUser(){
    console.log('test edit User');
    const dialogRef = this.dialog.open(DialogEditUserComponent, { disableClose: true });
    dialogRef.componentInstance.user = new User(this.user);
    dialogRef.componentInstance.userId = this.userId;
    
  }
}
