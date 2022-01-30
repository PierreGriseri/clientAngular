import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  displayedColumns: string[] = [
    'id',
    'nom',
    'dateRendu',
    'auteur',
    'note',
    'remarque',
    'nomMatiere',
  ];
  dataSource!: MatTableDataSource<Assignment>;

  constructor(private assignmentService: AssignmentsService) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAssignments();
    //this.paginator = new MatPaginator();
  }

  ngAfterViewInit(): void {
    this.paginator.pageSize = 10;
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data;
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }

  numberOfAssignments() {
    console.log('NUMBER ' + this.assignments.length);
    this.assignments.length;
  }
}
