import { Component, OnInit } from "@angular/core";
import {
  InvitationDisplay,
  AnswerInvitation
} from "../dominio/invitation.domain";
import { InvitationService } from "../servicio/invitation.service";
import { timer } from "rxjs";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  invitations: InvitationDisplay[] = [];
  userSignedIn: number = 0;

  constructor(private invitationService: InvitationService) {}

  ngOnInit(): void {
    timer(0, 500).subscribe(() => {
      if (sessionStorage.getItem("loginToken") != null && sessionStorage.getItem("loginToken") !== "") {
        this.invitationService
          .getInvitations()
          .subscribe((invitations: InvitationDisplay[]) => {
            this.invitations = invitations;
          });
      }
    });
  }

  answerInvitation(invitation: InvitationDisplay, answer: boolean) {
    let answeredInvitation: AnswerInvitation = {
      id: invitation.id,
      isAccepted: answer
    };
    this.invitationService
      .answerInvitation(invitation.id, answeredInvitation)
      .subscribe(() => {
        this.invitationService
          .getInvitations()
          .subscribe((invitations: InvitationDisplay[]) => {
            this.invitations = invitations;
          });
      });
  }

  acceptInvitation(invitation: InvitationDisplay) {
    this.answerInvitation(invitation, true);
  }

  rejectInvitation(invitation: InvitationDisplay) {
    this.answerInvitation(invitation, false);
  }
}
