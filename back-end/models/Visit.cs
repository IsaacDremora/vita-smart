using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Visit
{
    public int visitId {get;set;}
    public DateTime visitDate {get; set;}
    public string? diagnosis {get; set;}
    [ForeignKey("Patient")]
    public int patientId {get;set;}
}