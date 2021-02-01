import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBop6vDS-Vyjujl71qcPYLui2ZxyrHDppc',
  authDomain: 'quiz-on-mobile-app.firebaseapp.com',
  projectId: 'quiz-on-mobile-app',
  storageBucket: 'quiz-on-mobile-app.appspot.com',
  messagingSenderId: '788525031845',
  appId: '1:788525031845:web:373436ebcb4702ddc0884c',
  measurementId: 'G-STC8219D5F'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
