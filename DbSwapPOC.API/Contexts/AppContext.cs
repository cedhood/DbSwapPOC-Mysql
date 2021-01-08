using System;
using DbSwapPOC.API.Models;
using DbSwapPOC.API.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DbSwapPOC.API.Contexts
{
    public class AppContext : DbContext
    {
        private readonly IConfiguration configuration;

        public AppContext(IConfiguration configuration)
        {
            this.configuration = configuration;
            
            /* Apply migrations on the fly for demo purposes, not valid for production */
            Database.Migrate();
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            switch (AppSettings.CurrentDatabaseType) {
                case SupportedDatabases.SQL_SERVER:
                    optionsBuilder.UseSqlServer(configuration.GetConnectionString("SqlConnection"));
                    break;
                case SupportedDatabases.POSTGRES:
                    optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgresConnection"));
                    break;
                default:
                    break;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // switch (AppSettings.CurrentDatabaseType) {
            //     case SupportedDatabases.SQL_SERVER:
            //         modelBuilder.HasDefaultSchema("dbo");
            //         break;
            //     case SupportedDatabases.POSTGRES:
            //         modelBuilder.HasDefaultSchema("public");
            //         break;
            //     default:
            //         break;
            // }
                
            base.OnModelCreating(modelBuilder);
        }
    }
}