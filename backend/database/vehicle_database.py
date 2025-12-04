#the main aim of vehicle_database is to create the connection with the customer.db
from sqlalchemy import create_session
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite3:////home/jeff/Documents/Project/VehicleServiceManagement/backend/database/vehicle.db"

engine = create_session(DATABASE_URL)

SessionLocal = sessionmaker(engine=engine, autocommit=False, autoflush=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


