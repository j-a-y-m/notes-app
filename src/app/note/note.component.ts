import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NoteService} from '../note.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit,OnChanges {


  content : string | null ;

  @Input()
  noteProps : {folderId:string, noteId:String} | undefined | null;

  constructor(private noteService : NoteService,private matDialog : MatDialog) {


  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.noteProps = changes["noteProps"].currentValue;
    console.log(this.noteProps);
    this.content = this.noteService.getNote(this.noteProps.folderId,this.noteProps.noteId).noteContent ;
    console.log(this.content);

  }

  saveNote(noteContent: string) {
    console.log("noteContent "+noteContent);
    this.noteService.saveNote(this.noteProps.folderId,this.noteProps.noteId,noteContent);
  }

  deleteNote() {
    this.noteService.deleteNote(this.noteProps.folderId,this.noteProps.noteId);
  }
}
