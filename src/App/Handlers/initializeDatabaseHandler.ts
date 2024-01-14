import DatabaseInitializer from '../../Infra/Sqlite/DatabaseInitializer'

export const initializeDatabaseHandler = async () => {
  const databaseInitializer = new DatabaseInitializer()
  await databaseInitializer.dropAllTables()
  await databaseInitializer.createAllTables()
}
