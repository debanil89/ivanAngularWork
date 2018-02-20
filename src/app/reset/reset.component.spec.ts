import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { ResetComponent } from './reset.component';
import { Component, OnInit } from '@angular/core';
 
describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
