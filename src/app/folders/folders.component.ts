import {AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Observable, of, Subject} from 'rxjs';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';
import { NoteService } from '../note.service';
import { Folder } from './folder.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Output()
  selectedFolder = new EventEmitter<string>() ;

  @Output()
  folderDeleted = new EventEmitter<string>() ;

  folders : Subject<Folder[]>  ;

  foldersN : Folder[] | null | undefined ;


  constructor(private noteService : NoteService,private matDialog : MatDialog, private snackBar: MatSnackBar) {
    //this.folders = this.noteService.getFolders() ;

    this.folders = this.noteService.foldersSub ;
    this.folders.subscribe({
      next : (folders)=>{
        this.foldersN = folders ;
      }
    })
  }

  ngOnInit() {
    this.folders.subscribe(
      {
        next : (i)=>{
          console.log("init "+JSON.stringify(i));

        }
      }
    )

    this.noteService.getFolders()

    //console.log("folder component "+JSON.stringify(this.folderrs, this.getCircularReplacer()));
    //this.folders = of([1,2,3])
    // this.noteService.addFolder("angular");
  }

  // const getCircularReplacer = () => {
  //   const seen = new WeakSet();
  //   return (key, value) => {
  //     if (typeof value === "object" && value !== null) {
  //       if (seen.has(value)) {
  //         console.log("cyclic "+value);
  //         return;
  //       }
  //       seen.add(value);
  //     }
  //     return value;
  //   };
  // };


  newFolder(){
    console.log("new folder click");
    const folderNameInputDialogRef = this.matDialog.open(InputDialogComponent,{data:{inputType:"Folder"}});
    folderNameInputDialogRef.afterClosed().subscribe({
      next : (data)=>{
        this.noteService.addFolder(data.inputName);
      }
    })

    this.folders.subscribe(
      {
        next : (i)=>{
          console.log("new Folder com "+JSON.stringify(i));

        }
      }
    )
  }

  ngAfterViewInit(): void {
    this.noteService.getFolders();
  }

  ngAfterContentInit(): void {
    this.noteService.getFolders();
  }

  print(fold : Observable<Folder[]>){

    fold.subscribe((folds)=>{

      console.log(folds);
    })


  }

  selectFolder(folderId: string) {
    // this.snackBar.open("folder selected",undefined, {
    //   duration: 1000
    // });
    console.log("folder selected");
    this.selectedFolder.emit(folderId) ;
  }


  deleteFolder(folderId: string, $event: MouseEvent) {
    $event.stopPropagation();
    this.noteService.deleteFolder(folderId);
    this.folderDeleted.emit(folderId) ;
    this.snackBar.open("folder deleted",undefined, {
      duration: 1000
    });
    console.log("folder delete");
  }
}
