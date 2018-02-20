import { Component, OnInit } from '@angular/core'; 

import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';
import { ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { moveIn, fallIn, fadeInAnimation } from '../router.animations';
 

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  animations: [moveIn(), fallIn(), fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})


export class ResetComponent implements OnInit { 

  @ViewChild("myLabelEmail") labemail;
  @ViewChild("myLabelPass") labpass;

  ngOnInit() {
  }

  state: string = '';
  error: any;
  emailgood: boolean = false; 
  passgood: boolean = false; 
  typed1forpass: boolean = false;

  constructor(public af: AngularFireAuth,private router: Router) {

  }

   
  checkEmail(formData) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailgood=re.test(String(formData.value.email).toLowerCase());

    if (this.emailgood==true)
    { 
      this.labemail.nativeElement.classList.add("valid");
      this.labemail.nativeElement.classList.remove("invalid");
    } else {
      this.labemail.nativeElement.classList.add("invalid");
      this.labemail.nativeElement.classList.remove("valid");
    }
  }
 

  onSubmit(formData) {

    var trigger = "2",
    regexp = new RegExp('^[1-9]\d{0,2}$'),
    test = regexp.test(trigger); 

    //First handle if user fields are empty
    if (formData.value.email==undefined)
    {
      this.error = "Please Enter Email!";  
    }
  
    // Check if email is valid 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailgood=re.test(String(formData.value.email).toLowerCase());

    if (this.emailgood==false)
    {
      this.error = "Please Enter Valid Email ";  
    } 
    
    if(formData.valid && this.error==undefined) {
      console.log(formData.value);
      
      var auth = firebase.auth();
      var emailAddress = "lukaamarr@gmail.com"; 
      ///
      
      var auth = firebase.auth(); 
      auth.sendPasswordResetEmail(emailAddress)
        .then(() => this.passgood = true  
      )
        .catch((error) => console.log(error))  

        if( this.passgood==true) {
          this.labemail.nativeElement.classList.add("valid");
          this.labemail.nativeElement.classList.remove("invalid");
        } else {
          this.labemail.nativeElement.classList.add("invalid");
          this.labemail.nativeElement.classList.remove("valid");
        }
 

    }
  }

}
