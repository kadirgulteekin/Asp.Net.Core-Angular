using API.Extensions;
using API.Helpers;
using API.Infrastructure.DataContext;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using Microsoft.Extensions.Configuration;
using API.Core.Interface;
using API.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

//var provider = builder.Services.BuildServiceProvider();
//var configuration = provider.GetRequiredService<IConfiguration>();

IConfiguration configuration = builder.Configuration;

// Add services to the container.



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddApplicationServices();



builder.Services.AddDbContext<StoreContext>(options =>
         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var redis = ConnectionMultiplexer.Connect(configuration.GetConnectionString("Redis"));

builder.Services.AddScoped(s => redis.GetDatabase());

//builder.Services.AddIdentity<IdentityUser,IdentityRole>()
//       .AddEntityFrameworkStores<StoreContext>()
//       .AddDefaultTokenProviders();

builder.Services.AddIdentityServices(configuration);


builder.Services.AddSwaggerDocumentation();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});


var app = builder.Build();


app.UseMiddleware<ExceptionMiddleware>();

app.UseStatusCodePagesWithReExecute("/error/{0}");
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.UseSwaggerDocumentation();

app.MapControllers();

app.Run();