import { Component, OnInit, NgModule,  Pipe  } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth  } from 'angularfire2/auth';
import {Subscription} from 'rxjs'

import { Router } from '@angular/router';
import { moveIn, fallIn,fadeInAnimation } from '../router.animations';
import { ViewChild } from '@angular/core';
 
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn(), fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})

export class EmailComponent implements OnInit { 

  @ViewChild("myLabelEmail") labemail;
  @ViewChild("myLabelPass") labpass; 
  error: any;
  public sub:Subscription;

  constructor(public af: AngularFireAuth,private router: Router ) {
    this.af.authState.subscribe(auth => { 
      if(auth) {
       // this.router.navigateByUrl('/home');
      }
    }) ;
  } 


  loginFb() {
    this.af.auth.signInWithPopup( 
      new firebase.auth.FacebookAuthProvider()
     ).then((value) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }
           
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();               
    return this.oAuthLogin(provider)
      .then((value) => {
        // lets try something
        console.log('here');
        this.router.navigateByUrl('/home');
      }).catch(
        (err) => {
        this.error = err;
      })
  }
  
  ngOnInit() {
  }
  

  public shouldShow = true;
  state: string = '';
 
  emailgood: boolean = false;
  passgood: boolean = false;
  typed1forpass: boolean = false;

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

  checkPass(formData) {
    var re = /^.{6,}$/;
    this.passgood=re.test(String(formData.value.password).toLowerCase());

    if (this.labpass.nativeElement.selectionStart>1)
    this.typed1forpass = true;

    if (this.passgood==true)
    { 
      this.labpass.nativeElement.classList.add("valid");
      this.labpass.nativeElement.classList.remove("invalid");
    } else {
      this.labpass.nativeElement.classList.add("invalid");
      this.labpass.nativeElement.classList.remove("valid");
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
    else if (formData.value.password==undefined)
    {
      this.error = "Please Enter Password!";
    }

    //check if password is longer then 6 characters 
    if (formData.value.password.length < 6) 
    {
      this.error = "Password should be longer then 5 characters!"; 
    }  

    // //Validate full name 
    // var valid = /^[a-z]+ [a-z]+$/i
    // var namevalid = re.test(String(formData.value.email).toLowerCase());
    // if (namevalid==false)
    // {
    //   this.error = "Please Enter Name in Correct Format!";  
    // }
 
    // Check if email is valid 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailgood=re.test(String(formData.value.email).toLowerCase());

    if (this.emailgood==false)
    {
      this.error = "Please Enter Valid Email ";  
    } 


    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.signInWithEmailAndPassword( 
       formData.value.email,
       formData.value.password
      ).then(
        (success) => {
        console.log(success);
        this.af.auth.sendPasswordResetEmail
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }


  private oAuthLogin(provider) {
    return this.af.auth.signInWithPopup(provider); 
  }
  
  ngOnDestroy(){
    if(this.sub)
    this.sub.unsubscribe();
  }

}
