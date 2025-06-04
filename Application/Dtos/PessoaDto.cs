using System;

namespace Application.Dtos
{
    public class PessoaDto
    {
        public int? Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public DateOnly DataNascimento { get; set; }
    }
}
