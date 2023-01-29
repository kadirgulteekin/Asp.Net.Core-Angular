using API.Core.DbModels.Identity;

namespace API.Core.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
