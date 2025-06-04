import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { Pessoa } from '../../models/pessoa.model';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './pessoa-list.component.html',
  styleUrl: './pessoa-list.component.scss'
})
export class PessoaListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'endereco', 'dataNascimento', 'acoes'];
  dataSource = new MatTableDataSource<Pessoa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarPessoas(): void {
    this.pessoaService.getAll().subscribe({
      next: (pessoas) => {
        this.dataSource.data = pessoas;
      },
      error: (erro) => {
        this.snackBar.open('Erro ao carregar pessoas', 'Fechar', { duration: 3000 });
        console.error(erro);
      }
    });
  }

  editar(id: number): void {
    this.router.navigate(['/pessoas/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Pessoa excluída com sucesso', 'Fechar', { duration: 3000 });
          this.carregarPessoas();
        },
        error: (erro) => {
          this.snackBar.open('Erro ao excluir pessoa', 'Fechar', { duration: 3000 });
          console.error(erro);
        }
      });
    }
  }

  novaPessoa(): void {
    this.router.navigate(['/pessoas/nova']);
  }
}
