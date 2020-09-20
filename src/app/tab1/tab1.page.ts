import { Component, ViewChild, OnInit } from '@angular/core';
import { IonReorderGroup, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Task } from '../model/Task';
import { Storage } from '@ionic/storage';
import { FacadeService } from '../service/facade.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  tasks = new Array<Task>();
  task: Task = new Task();
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public popoverController: PopoverController, private facadeService: FacadeService, private storage: Storage, private toastController: ToastController, private alertController: AlertController) { }
  ngOnInit() {
    this.getTasks();
  }

  reorderItems(event) {
    const itemMove = this.tasks.splice(event.detail.from, 1)[0];
    this.tasks.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
    this.storage.set('tasks', this.tasks).then(() => {
      this.getTasks();
    });
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  addTask() {
    this.textPrompt();
  }

  getTasks() {
    this.storage.get('tasks').then(tasks => {
      if (tasks === null) {
        this.tasks = new Array();
      } else {
        this.tasks = tasks;
      }
    });
  }

  deleteAll() {
    this.tasks = [];
    this.storage.set('tasks', this.tasks).then(() => {
      this.toast('Deleted all tasks successfully', 'dark');
      this.getTasks();
    });
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.storage.set('tasks', this.tasks).then(() => {
      this.toast('Deleted task successfully', 'dark');
      this.getTasks();
    });
  }

  changeStatus(index) {
    this.tasks[index].status = this.tasks[index].status === 'pending' ? 'finished' : 'pending';
    this.storage.set('tasks', this.tasks).then(() => {
      this.toast('Changed status of task successfully', 'dark');
      this.getTasks();
    });
  }


  textPrompt() {
    this.alertController.create({
      header: 'Add Task!',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: 'Please add the details of task!'
        },
        {
          name: 'todoDate',
          type: 'date',
          min: '2017-01-01'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (!data.value.trim()) {
              this.toast('Please enter reason for rejection', 'danger');
              this.textPrompt();
            } else {
              this.task.id = this.facadeService.idGenerate();
              this.task.name = data.value.trim();
              if (data.todoDate) {
                this.task.date = data.todoDate;
              } else {
                this.task.date = this.getDate();
              }
              this.task.status = 'pending';
              console.log(this.task);
              this.tasks.unshift(this.task);
              this.storage.set('tasks', this.tasks).then(() => {
                this.getTasks();
                this.toast('Task has been added successfully', 'dark');
              });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }


  toast(mes, col) {
    this.toastController.create({
      message: mes,
      position: 'bottom',
      color: col,
      duration: 2000
    }).then(toast => toast.present());
  }

  getDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
