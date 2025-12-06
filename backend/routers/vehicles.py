from fastapi import APIRouter, Depends
from fastapi import Query
from sqlalchemy.orm import Session
from schemas.vehicle import VehicleBase, VehicleCreate, VehicleOut, VehicleUpdate
from models.vehicle import Vehicle
from database.database import get_db as get_vehicle_db
from typing import Annotated, Union

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

@router.post("/", response_model=VehicleOut)
async def add_vehicle(data : VehicleCreate, db : Session = Depends(get_vehicle_db)):
   #to add vehicle to the database 
   new_vehicle = Vehicle(**data.dict()) 
   db.add(new_vehicle)
   db.commit()
   db.refresh(new_vehicle)
   return new_vehicle

@router.get("/", response_model=list[VehicleOut])
async def get_all_vehicle(db : Session = Depends(get_vehicle_db)):
    #return all the vehicle in db
    vehicles = db.query(Vehicle).all()
    return vehicles

@router.get("/id/{id}", response_model=VehicleOut)
async def get_vehicle_by_id(id : int, db : Session = Depends(get_vehicle_db)):
    #return the vehicle by id from the db
    vehicle = db.query(Vehicle).filter(Vehicle.id == id).first()
    return vehicle

@router.get("/customer/{id}", response_model=list[VehicleOut])
async def get_vehicle_by_customer_id(id : int, db : Session = Depends(get_vehicle_db)):
    #return the vehicle by customer id
    vehicles = db.query(Vehicle).filter(Vehicle.customer_id == id).all()
    return vehicles

@router.put("/{id}")
async def update_vehicle_by_id(id : int, data : VehicleUpdate, db : Session = Depends(get_vehicle_db)):
    #update the vehicle by id in the db
    vehicle = db.query(Vehicle).filter(Vehicle.id == id).first()
    updated_data = data.model_dump(exclude_unset=True) 
    for key, value in updated_data.items():
        setattr(vehicle, key, value)
    db.commit()
    db.refresh(vehicle)

@router.delete("/{id}")
async def delete_vehicle_by_id(id : int, db : Session = Depends(get_vehicle_db)):
    #delete an entry from the db
    vehicle = db.query(Vehicle).filter(Vehicle.id == id).first()
    db.delete(vehicle)
    db.commit()
    return vehicle 

@router.get("/filter", response_model=list[VehicleOut])
async def filter_vehicle(
    #return the vehicle by filtering with make, model, year
        make : str | None = None,
        model : str | None = None,
        year : Annotated[Union[int, None] ,Query(gt=1000, lt=9999)] = None,
        db : Session = Depends(get_vehicle_db)
        ):
    if make is not None:
        vehicles = db.query(Vehicle).filter(Vehicle.make == make)
    elif model is not None:
        vehicles = db.query(Vehicle).filter(Vehicle.model == model)
    elif year is not None:
        vehicles = db.query(Vehicle).filter(Vehicle.year == year)
    
    return vehicles

