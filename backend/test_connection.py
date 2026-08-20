"""import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Nikhil@123",   # Replace with your MySQL password
    database="business_dashboard"
)

print("✅ Connected to MySQL successfully!")

conn.close()"""

from database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT DATABASE();"))
        print("Connected to:", result.scalar())
except Exception as e:
    print("Connection failed!")
    print(e)

    from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

password = quote_plus("Nikhil@123")

DATABASE_URL = f"mysql+pymysql://root:{password}@localhost/business_dashboard"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

