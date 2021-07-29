import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NoteService} from '../note.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit,OnChanges {


  content : string | null ;

  @Input()
  noteProps : {folderId:string, noteId:String} | null;

  constructor(private noteService : NoteService,private matDialog : MatDialog, private snackBar: MatSnackBar) {


  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.noteProps = changes["noteProps"].currentValue;
    console.log("sel note "+this.noteProps);
    if (this.noteProps){
      this.content = this.noteService.getNote(this.noteProps.folderId,this.noteProps.noteId).noteContent ;
      console.log(this.content);
    }


  }

  saveNote(noteContent: string) {
    console.log("noteContent "+noteContent);
    this.noteService.saveNote(this.noteProps.folderId,this.noteProps.noteId,noteContent);
    this.snackBar.open("Note saved",undefined, {
      duration: 2000
    });
  }

  deleteNote() {
    this.noteService.deleteNote(this.noteProps.folderId,this.noteProps.noteId);
    this.noteProps = null ;
  }
}
