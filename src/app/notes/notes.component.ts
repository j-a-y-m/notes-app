import {Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, AfterContentInit, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Folder} from '../folders/folder.model';
import {NoteService} from '../note.service';
import {MatDialog} from '@angular/material/dialog';
import {filter, flatMap, map} from 'rxjs/operators';
import {Note} from './note.model';
import {InputDialogComponent} from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {

  @Output()
  selectedNote = new EventEmitter<{folderId:string, noteId:String}>() ;

  @Input()
  folderId : string | null;

  folders : Observable<Folder[]>  ;
  notes : Observable<Note[]> ;



  notesN : Note[] ;

  private viewReady: boolean = false;


  constructor(private noteService : NoteService,private matDialog : MatDialog) {
    this.notes = new Subject <Note[]>();
    this.folders = this.noteService.foldersSub ;
  }

  ngOnInit() {
    if (this.folderId)
    {
     this.folders.pipe(map((folders)=>{
        return folders.filter((folder)=>{
          console.log("folderid "+folder.folderId+" selected "+this.folderId);
          console.log("curr fid "+folder.folderId+" sel fid "+this.folderId);
          return folder.folderId === this.folderId ;
        })
      })).subscribe({
       next: (folder)=>{
         this.notesN = folder[0].notes ;
       }
     })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.folderId = changes["folderId"].currentValue ;
    console.log("sel fid "+this.folderId);

    if (this.folderId)
    {
      this.folders.pipe(map((folders)=>{
        return folders.filter((folder)=>{
          console.log("folderid "+folder.folderId+" selected "+this.folderId);
          console.log("curr fid "+folder.folderId+" sel fid "+this.folderId);
          return folder.folderId === this.folderId ;
        })
      })).subscribe({
        next: (folder)=>{
          this.notesN = folder[0].notes ;
        }
      })

      this.noteService.getFolders();
    }else
    {
      this.selectedNote.emit(null);
      this.notesN = [];
    }




  }

  newNote(){

    // this.notes = this.folders.pipe(flatMap((folders)=>{
    //   return folders.filter((folder)=>{
    //     console.log("folderid "+folder.folderId+" selected "+this.folderId);
    //     return folder.folderId === this.folderId ;
    //   }).map((filteredFolders)=>{
    //     return filteredFolders.notes
    //   })
    // }))

    const noteNameInputDialogRef = this.matDialog.open(InputDialogComponent,{data:{inputType:"Note"}});
    noteNameInputDialogRef.afterClosed().subscribe({
      next : (data)=>{
        if (this.folderId){
          this.noteService.addNote(this.folderId,data.inputName);
        }

      }
    })

  }

  ngAfterViewInit(): void {
    this.noteService.getFolders();
    this.viewReady = true ;
  }

  ngAfterContentInit(): void {
    this.noteService.getFolders();
    this.viewReady = true ;
  }


  selectNote(noteId: string , folderId : string) {
    console.log("sel note fid "+folderId+" nid "+ noteId);
    this.selectedNote.emit({folderId : folderId,noteId : noteId}) ;
  }
}
