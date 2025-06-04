import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { Pessoa } from '../../models/pessoa.model';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  maxDate: Date = new Date(); // Limita a data máxima ao dia atual

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      endereco: ['', [Validators.required, Validators.maxLength(200)]],
      dataNascimento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.carregarPessoa();
    }
  }

  carregarPessoa(): void {
    this.pessoaService.getById(this.id!).subscribe({
      next: (pessoa) => {
        if (pessoa.dataNascimento) {
          const data = new Date(pessoa.dataNascimento);
          pessoa.dataNascimento = data.toISOString().split('T')[0];
        }
        this.form.patchValue(pessoa);
      },
      error: (erro) => {
        this.snackBar.open('Erro ao carregar pessoa', 'Fechar', { duration: 3000 });
        console.error(erro);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const pessoa: Pessoa = { ...this.form.value };
      
      if (pessoa.dataNascimento) {
        const data = new Date(pessoa.dataNascimento);
        pessoa.dataNascimento = data.toISOString().split('T')[0];
      }

      if (this.id) {
        this.pessoaService.update(this.id, pessoa).subscribe({
          next: () => {
            this.snackBar.open('Pessoa atualizada com sucesso', 'Fechar', { duration: 3000 });
            this.router.navigate(['/pessoas']);
          },
          error: (erro) => {
            this.snackBar.open('Erro ao atualizar pessoa', 'Fechar', { duration: 3000 });
            console.error(erro);
          }
        });
      } else {
        this.pessoaService.create(pessoa).subscribe({
          next: () => {
            this.snackBar.open('Pessoa criada com sucesso', 'Fechar', { duration: 3000 });
            this.router.navigate(['/pessoas']);
          },
          error: (erro) => {
            this.snackBar.open('Erro ao criar pessoa', 'Fechar', { duration: 3000 });
            console.error(erro);
          }
        });
      }
    }
  }

  voltar(): void {
    this.router.navigate(['/pessoas']);
  }
}
