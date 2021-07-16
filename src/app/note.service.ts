import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Folder } from './folders/folder.model';
import { Note } from './notes/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  dataUpdate : Subject<Folder[]> ;
  foldersSub : Subject<Folder[]>;

  constructor() {
    this.dataUpdate =  new Subject();
    this.foldersSub  = new Subject<Folder[]>()
  }


  getFolders()
  {

    //const foldersSub = new Subject<Folder[]>();


    //this.dataUpdate.subscribe(foldersSub)


    let folders = JSON.parse(localStorage.getItem('folders')) as Folder[] ;
    this.foldersSub.next(folders);

    console.log("folders: "+folders);
    // return this.foldersSub;
  }


  addFolder(name : string)
  {
    let id : string = uuidv4();
    let folder : Folder = {
      folderId : id,
      folderName : name,
      notes : []
    }
    if(!localStorage.getItem('folders'))
    {
      console.log("no folders");
      let folders = [folder]
      localStorage.setItem('folders', JSON.stringify(folders));
    }else
    {
      let folders : Folder[]= JSON.parse(localStorage.getItem('folders')) ;
      // console.log("folder retrived "+folders["folders"][0].);
      folders.push(folder);
      console.log("folder added "+folders);
      localStorage.removeItem("folders");
      localStorage.setItem('folders', JSON.stringify(folders));
    }
    console.log(JSON.parse(localStorage.getItem('folders')));
    const newFolders = JSON.parse(localStorage.getItem('folders')) as Folder[];
    console.log("get aft new fold "+ JSON.stringify(newFolders));
    this.dataUpdate.next(newFolders);
    this.foldersSub.next(newFolders);
  }

  deleteFolder()
  {

  }

  addNote(folderId : string, title : string)
  {
    let id : string = uuidv4();
    const folders = JSON.parse(localStorage.getItem('folders')) as Folder[];
    //console.log(JSON.stringify(folders));
    for (let folder of folders)
    {
      if (folder.folderId === folderId)
      {
        const note : Note = {noteId:id, noteName : title, noteContent : "test test"} ;
        folder.notes.push(note);
        console.log("new note serv "+ JSON.stringify(folder.notes));
        localStorage.removeItem("folders");
        localStorage.setItem('folders', JSON.stringify(folders));
        break;
      }
    }
    // const newFolders = JSON.parse(localStorage.getItem('folders'))["folders"] as Folder[];
    const newFolders = JSON.parse(localStorage.getItem('folders')) as Folder[]
    console.log("new note now folder serv "+ JSON.stringify(newFolders));
    this.foldersSub.next(newFolders);
    // folders

  }

  getNote(folderId:string, noteId:String) : Note
  {
    const folders = JSON.parse(localStorage.getItem('folders')) as Folder[];
    for (let folder of folders) {
      if (folder.folderId === folderId) {
          for (let note of folder.notes)
          {
            if (note.noteId === noteId)
            {
              return note ;
            }
          }
      }
    }
  }

  saveNote(folderId:string, noteId:String, noteContent : string)
  {
    const folders = JSON.parse(localStorage.getItem('folders')) as Folder[];
    for (let folder of folders) {
      if (folder.folderId === folderId) {
        for (let note of folder.notes)
        {
          if (note.noteId === noteId)
          {
            note.noteContent = noteContent ;
          }
        }
      }
    }
    localStorage.removeItem("folders");
    localStorage.setItem('folders', JSON.stringify(folders));

    const newFolders = JSON.parse(localStorage.getItem('folders')) as Folder[]

    this.foldersSub.next(newFolders);
  }

  deleteNote(folderId:string, noteId:String)
  {
    let folders = JSON.parse(localStorage.getItem('folders')) as Folder[];
    let noteIdx = 0;
    for (let folder of folders) {
      if (folder.folderId === folderId) {
        for (let note of folder.notes)
        {

          if (note.noteId === noteId)
          {
            break;
          }else {
            noteIdx++;
          }

        }
        folder.notes.splice(noteIdx,1);
        break;
      }
    }

    //
    // for (let folder of folders)
    // {
    //
    // }

    // folders.forEach((folder)=>{
    //   if (folder.folderId ===  folderId)
    //   {
    //     folder.notes.filter((note)=>{
    //       return !(note.noteId === noteId) ;
    //     })
    //   }
    // })

    localStorage.removeItem("folders");
    localStorage.setItem('folders', JSON.stringify(folders));
    const newFolders = JSON.parse(localStorage.getItem('folders')) as Folder[]

    this.foldersSub.next(newFolders);
  }

  deleteAll()
  {
    localStorage.removeItem("folders");
    console.log(JSON.parse(localStorage.getItem('folders')));
  }

}
