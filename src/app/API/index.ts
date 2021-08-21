import {iUser} from "../table/models/user.model";

/*
Вынес в API, потому что localStorage в данном случае симулирует запросы
к серверу
 */
export const API={
  save(payload:Array<iUser>){
    return localStorage.setItem('tableData', JSON.stringify(payload))
  },
  load(){
    return localStorage.getItem('tableData')
  }
}
