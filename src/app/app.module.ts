import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule, MatRippleModule} from '@angular/material';
import { FoldersComponent } from './folders/folders.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    NotesComponent,
    NoteComponent,
    InputDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  entryComponents: [InputDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
