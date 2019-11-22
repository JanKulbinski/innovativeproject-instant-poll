import { Component, OnInit } from '@angular/core';
import { BackendConnectionService } from "../backend-connection.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Room } from '../room';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  
	private array : Array<Room>;
	private dateString : String;
  
	constructor(private backendService: BackendConnectionService, private router: Router, private confirmationDialogService: ConfirmationDialogService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( "Instatnt Polls - Twoje pokoje" );
    var today = new Date();
	var dd = String(today.getDate()+1).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	this.dateString = yyyy + '-' + mm + '-' + dd;
    if (localStorage.getItem("rooms") !== null) {
		this.backendService.checkUserRoom(localStorage.getItem("rooms")).subscribe(response => {
			this.array = response;
            var rooms = [];
            for(var i in response) { 
                rooms.push(response[i].id)
            }
            localStorage.setItem("rooms",JSON.stringify(rooms));
		});
	} else {
		localStorage.setItem("rooms",  JSON.stringify([]));
	}
  }
  
  createRoom() {
	var name = (<HTMLInputElement>document.getElementById("roomName")).value;
	var date = (<HTMLInputElement>document.getElementById("date")).value;
	var token = localStorage.getItem("token");
	this.backendService.createRoom(name,date,token).subscribe(response => {
		var storedRooms = JSON.parse(localStorage.getItem("rooms"));
		var id = response['room_id'];
		var tokenNew = response['token'];
		storedRooms.push(id);
		localStorage.setItem("rooms",  JSON.stringify(storedRooms));
		localStorage.setItem("token",  tokenNew);
		this.enterRoom(id);
	  });
  }
  
  enterRoom(id: string) {
	  this.router.navigate(['/pollroom/',id]);
  }

  deleteRoom(id: string) {
      this.confirmationDialogService.confirm('Potwierdzenie', 'Czy na pewno chcesz zamknąć pokój? Stracisz wszystkie niezapisane dane i nie będziesz mógł wrócić  do pokoju.',"Zamknij pokój","Cofnij")
        .then((confirmed) => {
            if(confirmed) {
                var token = localStorage.getItem("token");
                this.backendService.closeRoom(id,token).subscribe(response => {
                if(response['result'] === 'success') {
                    this.array = this.array.filter(x => x.id !== id)
                }
                });
            }
        }).catch(() => {});
    }
    onDateSelect(date) {
        var dd = String(date.day).padStart(2, '0');
        var mm = String(date.month).padStart(2, '0');
        var yyyy = date.year
        this.dateString = yyyy + '-' + mm + '-' + dd;
    }
}
