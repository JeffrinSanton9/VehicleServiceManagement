from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from models.customer import Customer 
from database.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"), nullable = False)

    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    license_plate = Column(String, unique=True, nullable=False)
    mileage = Column(Integer)
    last_service_date = Column(Date)

    customer = relationship("Customer", back_populates="vehicles")
    service_bookings = relationship("ServiceBooking", back_populates="vehicle", cascade="all, delete")
