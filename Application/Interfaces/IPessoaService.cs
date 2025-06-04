using Application.Dtos;

namespace Application.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaDto>> GetAllAsync();
        Task<PessoaDto?> GetByIdAsync(int id);
        Task<PessoaDto> CreateAsync(PessoaDto dto);
        Task UpdateAsync(int id, PessoaDto dto);
        Task DeleteAsync(int id);
    }
}
