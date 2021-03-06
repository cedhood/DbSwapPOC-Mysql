using System;
using DbSwapPOC.API.ModelConfigurers;
using DbSwapPOC.API.Settings;

namespace DbSwapPOC.API.Factories
{
  public class ModelCreatorFactory : IModelCreatorFactory
  {
    public IModelConfigurer GetInstance(SupportedDatabases databaseType)
    {
      switch (AppSettings.CurrentDatabaseType)
      {
        case SupportedDatabases.SQL_SERVER:
          return new SQLServerModelConfigurer();
        case SupportedDatabases.MYSQL:
          return new MysqlModelConfigurer();
        default:
          throw new InvalidOperationException("Database type not found");
      }
    }
  }
}