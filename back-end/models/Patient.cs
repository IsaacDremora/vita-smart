using System.ComponentModel.DataAnnotations;

public class Patient
{
    public int patientId {get;set;}
    public string? name {get; set;}
    public string? surName {get; set;}
    public string? lastName {get; set;}
    public DateTime? birthDate {get; set;}
    public string? phoneNumber {get; set;}
}