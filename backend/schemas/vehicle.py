from pydantic import BaseModel
from datetime import date
from typing import Annotated

class VehicleBase(BaseModel):
    customer_id : int
    make : str
    model : str
    year : int
    license_plate : str
    mileage : int | None = None
    last_service_date : date | None = None


class VehicleOut(VehicleBase):
    id : int
    class Config():
        orm_mode = True

class VehicleCreate(BaseModel):
    customer_id: int
    make: str
    model: str
    year: int
    license_plate: str
    mileage: int | None = None
    last_service_date: date | None = None

class VehicleUpdate(BaseModel):
    customer_id : int | None
    make : str | None
    mode : str | None
    year : int | None
    license_plate : str | None
    mileage : str | None
    last_service : date | None
