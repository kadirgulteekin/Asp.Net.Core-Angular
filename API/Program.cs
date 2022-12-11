using API.Extensions;
using API.Helpers;
using API.Infrastructure.DataContext;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddApplicationServices();
builder.Services.AddSwaggerDocumentation();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy => 
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});

IConfiguration configuration = builder.Configuration;
var multiplexer = ConnectionMultiplexer.Connect(configuration.GetConnectionString("Redis"));
builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);


//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<StoreContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDbContext<StoreContext>(options =>
         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//    app.UseDeveloperExceptionPage();
//}

app.UseMiddleware<ExceptionMiddleware>();

app.UseStatusCodePagesWithReExecute("/error/{0}");
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.UseSwaggerDocumentation();

app.MapControllers();

app.Run();
