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

  selectFolder(folderId: string) {
    if (this.selectedFolder!==folderId)
    {
      // this.selectedFolder = null ;
      this.selectedNote= null ;

    }
    this.selectedFolder = folderId ;
    // console.log($event);
  }

  selectNote($event: { folderId: string; noteId: String }) {


    this.selectedNote= $event ;
  }

  onFolderDelete(folderId: string) {
      if (folderId===this.selectedFolder)
      {
        this.selectedFolder= null;
      }
  }
}
