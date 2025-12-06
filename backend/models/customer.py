from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import declarative_base, relationship
from database.database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=True)
    vehicles = relationship("Vehicle", back_populates="customer", cascade="all, delete")

