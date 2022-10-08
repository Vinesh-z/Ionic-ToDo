import { Component, OnInit } from '@angular/core';
import { Task } from '../model/Task';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  tasks = new Array<Task>();
  loaded = false;
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
        this.tasks = tasks.filter(task => task.status === 'finished');
      }
      this.loaded = true;
    });
  }
}
