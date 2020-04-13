using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
    public class NoteContext :DbContext
    {
        public NoteContext(DbContextOptions<NoteContext> options) : base(options)
        {

        }
        public DbSet<Note> NoteItems { get; set; }
    }
}
