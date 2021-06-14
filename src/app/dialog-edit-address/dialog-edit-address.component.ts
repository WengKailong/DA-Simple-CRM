import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user: User = new User();
  userId: string = '';
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>,  private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  editAddress(){
    this.loading = true;
    this.firestore.collection('users').doc(this.userId).update(this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });;
    
    
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
