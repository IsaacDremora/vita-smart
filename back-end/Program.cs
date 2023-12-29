using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ToDo API",
        Description = "So simple API for creating tables of patients and visits"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options =>
    {
        options.SerializeAsV2 = true;  
    });
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.MapGet("/Patients", async (DatabaseContext db) => await db.Patients.ToListAsync());

app.MapGet("/Patients/{name}", async (DatabaseContext db, string Name) => 
{
    return await db.Patients.Where(x => x.name == Name).ToListAsync();
});

app.MapGet("/Visits", async (DatabaseContext db) => await db.Visits.ToListAsync());

app.MapGet("/Visits/{id}", async (DatabaseContext db, int id) =>
{
 return await db.Visits.Where(x => x.patientId == id).ToListAsync();
});


app.MapPost("/Patients", async (DatabaseContext db, Patient patients) =>
{
    await db.Patients.AddAsync(patients);
    await db.SaveChangesAsync();
    return Results.Created($"/Patients/{patients.patientId}", patients);
});

app.MapPost("/Visits", async (DatabaseContext db, Visit visits) =>
{
    await db.Visits.AddAsync(visits);
    await db.SaveChangesAsync();
    return Results.Created($"/Visits/{visits.visitId}", visits);
});

app.MapPut("/Patients/{id}",async (DatabaseContext db, Patient update, int id) => 
{
    var patient = await db.Patients.FindAsync(id);
    if (patient == null) return Results.NotFound();
    patient.name = update.name;
    patient.lastName = update.lastName;
    patient.surName = update.surName;
    patient.phoneNumber = update.phoneNumber;
    patient.birthDate = update.birthDate;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPut("/Visits/{id}", async (DatabaseContext db, Visit update, int id) =>
{
    var visit = await db.Visits.FindAsync(id);
    if (visit == null) return Results.NotFound();
    visit.diagnosis = update.diagnosis;
    visit.visitDate = update.visitDate; 
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/Patients/{id}", async (DatabaseContext db, int id) =>
{
    var removename = await db.Patients.FindAsync(id);
    if (removename == null) return Results.NotFound();
    db.Patients.Remove(removename);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapDelete("/Visits/{id}", async (DatabaseContext db, int id) =>
{
    var removename = await db.Visits.FindAsync(id);
    if (removename == null) return Results.NotFound();
    db.Visits.Remove(removename);
    await db.SaveChangesAsync();
    return Results.Ok();
}
);

app.Run();
