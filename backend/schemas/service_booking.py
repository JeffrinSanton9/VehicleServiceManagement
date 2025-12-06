from pydantic import BaseModel
from datetime import date

class ServiceBooking(BaseModel):
    vehicle_id : int
    service_type : str 
    booking_date : date
    scheduled_date : date
    status : str
    estimated_cost : int | None
    actual_cost : int | None
    mechanic_notes : str | None
    customer_notes : str | None

class ServiceBookingCreate(ServiceBooking):
    pass

class ServiceBookingOut(ServiceBooking):
    id : int
    class Config:
        orm_mode = True

class ServiceBookingUpdate(BaseModel):
    vehicle_id : int | None = None
    service_type : str  | None = None
    booking_date : date | None = None
    scheduled_date : date | None = None
    status : str | None = None 
    estimated_cost : int | None = None
    actual_cost : int | None = None
    mechanic_notes : str | None = None
    customer_notes : str | None = None




