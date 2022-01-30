import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from 'src/app/assignments/matiere';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // associées au champs input du formulaire
  nomDevoir = '';
  dateDeRendu!: Date;
  auteur = '';
  noteFloat = '';
  ListMatiere!: Matiere[];
  imageMatiere!: string;
  nomMatiere!: string;
  imageIntervenant!: string;
  remarque!: string;

  constructor(
    private assignmentService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ListMatiere = Object.values(Matiere);
  }

  onSubmit() {
    console.log('NOM = ' + this.nomDevoir);
    console.log('DATE = ' + this.dateDeRendu);
    console.log('AUTEUR = ' + this.auteur);
    console.log('NOTE STRING = ' + this.noteFloat);
    console.log('NOM MATIERE = ' + this.nomMatiere);
    console.log('URL IMAGE = ' + this.imageMatiere);

    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 100000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.auteur;
    newAssignment.noteFloat = this.noteFloat;
    newAssignment.noteFinal = Number(this.noteFloat);
    newAssignment.nomMatiere = this.nomMatiere;
    newAssignment.imageMatiere = this.imageMatiere;
    newAssignment.imageIntervenant = this.imageIntervenant;
    newAssignment.remarque = this.remarque;

    this.assignmentService.addAssignment(newAssignment).subscribe((reponse) => {
      console.log(reponse.message);
      // maintenant il faut qu'on affiche la liste !!!
      this.router.navigate(['/home']);
    });
  }
}
