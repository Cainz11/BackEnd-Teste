using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _repository;
        private const string DATE_FORMAT = "dd/MM/yyyy";

        public PessoaService(IPessoaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PessoaDto>> GetAllAsync()
        {
            var pessoas = await _repository.GetAllAsync();
            return pessoas.Select(p => new PessoaDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Endereco = p.Endereco,
                DataNascimento = p.DataNascimento.ToString(DATE_FORMAT)
            });
        }

        public async Task<PessoaDto?> GetByIdAsync(int id)
        {
            var p = await _repository.GetByIdAsync(id);
            return p == null ? null : new PessoaDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Endereco = p.Endereco,
                DataNascimento = p.DataNascimento.ToString(DATE_FORMAT)
            };
        }

        public async Task<PessoaDto> CreateAsync(PessoaDto dto)
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Endereco = dto.Endereco,
                DataNascimento = DateTime.ParseExact(dto.DataNascimento, DATE_FORMAT, null)
            };
            var created = await _repository.AddAsync(pessoa);
            dto.Id = created.Id;
            dto.DataNascimento = created.DataNascimento.ToString(DATE_FORMAT);
            return dto;
        }

        public async Task UpdateAsync(int id, PessoaDto dto)
        {
            var pessoa = new Pessoa
            {
                Id = id,
                Nome = dto.Nome,
                Endereco = dto.Endereco,
                DataNascimento = DateTime.ParseExact(dto.DataNascimento, DATE_FORMAT, null)
            };
            await _repository.UpdateAsync(pessoa);
        }

        public async Task DeleteAsync(int id) => await _repository.DeleteAsync(id);
    }
}
