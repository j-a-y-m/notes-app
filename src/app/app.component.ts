import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudapp';

  selectedFolder : string | null = null ;
  selectedNote : {folderId:string, noteId:String} | null = null ;

  selectFolder($event: any) {
    this.selectedFolder = $event ;
    // console.log($event);
  }

  selectNote($event: { folderId: string; noteId: String }) {
    this.selectedNote= $event ;
  }
}
