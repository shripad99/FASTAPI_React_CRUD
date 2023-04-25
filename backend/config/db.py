# To connect through mysql
from sqlalchemy import create_engine, MetaData

DB_SERVER = 'localhost:3306'
DB_DATABASE = 'Infodb'
DB_USERNAME = 'root'
DB_PASSWORD = 'tiger'

engine = create_engine(f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_SERVER}/{DB_DATABASE}')

meta = MetaData()

con = engine.connect()


# To connect through mssql
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base

# DB_SERVER = 'localhost'
# DB_DATABASE = 'Test'
# DB_USERNAME = 'sa'
# DB_PASSWORD = 'shripad'

# # Create the database connection engine
# # DATABASE_URL = f"mssql+pyodbc://{DB_USERNAME}:{DB_PASSWORD}@{DB_SERVER}/{DB_DATABASE}?driver=ODBC+DRIVER+17+for+SQL+Server"
# engine = create_engine(f"mssql+pymssql://{DB_USERNAME}:{DB_PASSWORD}@{DB_SERVER}/{DB_DATABASE}")

# # Base = declarative_base()

# con = engine.connect()