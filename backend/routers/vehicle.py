from fastapi import APIRouter
from schemas.vehicle import VehicleBase, VehicleCreate, VehicleOut, VehicleUpdate
router = APIRouter(prefix="/vehicles", tags=["vehicles"])

@router.post("/", response_model=VehicleOut)
async def add_vehicle():
   #to add vehicle to the database 
    
@router.get("/", response_model=list[VehicleOut])
async def get_all_vehicle():
    #return all the vehicle in db

@router.get("/id/{id}", response_model=VehicleOut)
async def get_vehicle_by_id():
    #return the vehicle by id from the db

@router.get("/customer/{id}", response_model=VehicleOut)
async def get_vehicle_by_customer_id():
    #return the vehicle by customer id

@router.put("/{id}")
async def update_vehicle_by_id():
    #update the vehicle by id in the db

@router.delete("/{id}")
async def delete_vehicle_by_id():
    #delete an entry from the db

@router.get("/filter")
async def filter_vehicle():
    #return the vehicle by filtering with make, model, year
