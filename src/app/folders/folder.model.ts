import { Note } from "../notes/note.model";



export interface Folder {
    folderId : string,
    folderName : string,
    notes  : Note[]


}
