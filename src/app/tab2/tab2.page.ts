import { Component, OnInit } from '@angular/core';
import { Task } from '../model/Task';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  tasks = new Array<Task>();
  loaded=false;
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getTasks();
  }

  ionViewWillEnter() {
    this.getTasks();
  }

  getTasks() {
    this.storage.get('tasks').then(tasks => {
      if (tasks === null) {
        this.tasks = new Array();
      } else {
        this.tasks = tasks.filter(task => task.status === 'pending');
      }
      this.loaded=true;
    });
  }
}
