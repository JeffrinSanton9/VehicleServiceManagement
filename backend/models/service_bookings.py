from sqlalchemy import Column, Integer, String, Date, DECIMAL, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.database import Base   

class ServiceBooking(Base):
    __tablename__ = "service_bookings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id", ondelete="CASCADE"), nullable=False)

    service_type = Column(String, nullable=False)
    booking_date = Column(Date, nullable=False)
    scheduled_date = Column(Date, nullable=False)

    status = Column(String)
    estimated_cost = Column(DECIMAL(10,2))
    actual_cost = Column(DECIMAL(10,2))

    mechanic_notes = Column(Text)
    customer_notes = Column(Text)

    vehicle = relationship("Vehicle", back_populates="service_bookings")
