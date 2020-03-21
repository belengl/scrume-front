import { Component, OnInit } from '@angular/core';
import { ColumDto} from '../dominio/colum.domian';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardService } from '../servicio/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDto, TaskMove } from '../dominio/task.domain';
import { BoardSimple, Board } from '../dominio/board.domain';
import { Observable } from 'rxjs';
import { TaskService } from '../servicio/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;
  idBoard: number;
  task: TaskMove;
  n: number;
  taskSend: TaskMove;

  constructor(private router: Router, private boardService: BoardService, private activatedRoute: ActivatedRoute, private taskservice: TaskService) { }

  ngOnInit(): void {

     this.activatedRoute.queryParams.subscribe(param => {

       if(param.id != undefined){
         this.idBoard = param.id;

          this.boardService.getBoard(this.idBoard).subscribe((board:Board)=>{
             this.board = board;
             console.log("el json del tablero " + JSON.stringify(this.board))
          });

       }
     });

  }

  var: string = "To Do";

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {

      let col = new String(event.container.data);

      if (col == "To Do") {
        this.moveInArray(this.board.columns[0] , event.previousIndex , event.currentIndex);
      } else if (col == "Done"){
        this.moveInArray(this.board.columns[2] , event.previousIndex , event.currentIndex);
      } else {
        this.moveInArray(this.board.columns[1] , event.previousIndex , event.currentIndex);
      }
      
    } else {

      let col = new String(event.previousContainer.data);
      let col2 = new String(event.container.data);

      if (col == "To Do" && col2 == "In progress") {
        this.n = this.transferTaskToArray(this.board.columns[0].tasks, this.board.columns[1].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[1].id, this.n);
      } else if (col == "To Do" && col2 == "Done"){
        this.n = this.transferTaskToArray(this.board.columns[0].tasks, this.board.columns[2].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[2].id, this.n);
      } else if (col == "In progress" && col2 == "To Do"){
        this.n = this.transferTaskToArray(this.board.columns[1].tasks, this.board.columns[0].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[0].id, this.n);
      } else if (col == "In progress" && col2 == "Done"){
        this.n = this.transferTaskToArray(this.board.columns[1].tasks, this.board.columns[2].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[2].id, this.n);
      } else if (col == "Done" && col2 == "To Do"){
        this.n = this.transferTaskToArray(this.board.columns[2].tasks, this.board.columns[0].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[0].id, this.n);
      }else{
        this.n = this.transferTaskToArray(this.board.columns[2].tasks, this.board.columns[1].tasks, event.previousIndex, event.currentIndex);
        this.moveTask(this.board.columns[1].id, this.n);
      }

    }
    console.log("Previous container " + event.container.data);
    console.log("Previous index " +event.previousIndex);
    console.log("container " + event.container.data);
    console.log("Current index " + event.currentIndex);
    console.log("Distanse " + JSON.stringify(event.distance));
    console.log("Pointer over container " + event.isPointerOverContainer);
    console.log("item " + event.item.element.nativeElement.id);
  }

  private transferTaskToArray(origen: TaskDto[], destiny: TaskDto[], preIndex: number, newIndex: number) {
    
    let save = origen[preIndex];
    origen.splice(preIndex, 1);
    destiny.splice(newIndex, 0, save);
    return save.id;

  }

  private moveInArray(container: ColumDto, preIndex: number, newIndex: number) {

    let arrayTareas = container.tasks;
    let save = arrayTareas[preIndex];
    arrayTareas.splice(preIndex, 1);
    arrayTareas.splice(newIndex, 0, save);

  }

  connectColums(name: string) {
    let res: string;
    if (name == "To Do"){
        res = "[reviewList,doneList]"
    } else if (name == "Done"){
        res = "[reviewList,todoList]"
    }else{
        res = "[doneList,todoList]"
    }
 }

navigateTo(route: String): void{
  this.router.navigate([route]);
}

moveTask(idDest: Number, idtask: number): void {
  this.taskSend = {destiny: idDest, task: idtask};
  this.taskservice.moveTask(this.taskSend).subscribe((task : TaskMove) => {
    console.log(JSON.stringify(task));
  });
}

onClick(event): any {
  console.log(event.target.dataset.index);
}

deleteBord(idBoard : number): void {
  this.boardService.deleteBoard(idBoard).subscribe((board : BoardSimple) => {
    this.navigateTo("sprint");
  });
}


}
