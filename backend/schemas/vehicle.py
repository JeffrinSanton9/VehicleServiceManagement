from pydantic import BaseModel, date
from typing import Annotated
class VehicleBase(BaseModel):
    customer_id : int
    make : str
    mode : str
    year : int
    license_plate : str
    mileage : int
    last_service : date

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    id : int
    class Config():
        orm_mode = True

class VehicleUpdate(BaseModel):
    customer_id : int | None
    make : str | None
    mode : str | None
    year : int | None
    license_plate : str | None
    mileage : str | None
    last_service : date | None
