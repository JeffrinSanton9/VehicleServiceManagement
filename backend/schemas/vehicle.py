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
    
