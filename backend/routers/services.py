from fastapi import APIRouter, Depends, HTTPException
from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from database.database import get_db
from models.service_bookings import ServiceBooking
from schemas.service_booking import ServiceBookingUpdate, ServiceBookingCreate, ServiceBookingOut
from datetime import date
from models.vehicle import Vehicle
from models.customer import Customer

router = APIRouter(prefix="/booking", tags=["booking"])

@router.get("/", response_model = list[ServiceBookingOut])
async def get_all_bookings(db : Session = Depends(get_db)):
    #returns all the the booking details
    bookings = db.query(ServiceBooking).all()
    if not bookings:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    return bookings

@router.get("/upcoming", response_model = list[ServiceBookingOut])
async def get_upcoming_bookings(db : Session = Depends(get_db)):
    #return the upcoming bookings
    delta = timedelta(days = 7) 
    search_date = datetime.today() + delta
    vehicles = db.query(ServiceBooking).filter(search_date >= ServiceBooking.scheduled_date).all()
    if not bookings:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    return vehicles


@router.get("/{id}", response_model = ServiceBookingOut)
async def get_booking_by_id(db : Session = Depends(get_db)):
    #returns booking by its id
    booking = db.query(ServiceBooking).filter(ServiceBooking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    return booking

@router.get("/status/{status}", response_model = list[ServiceBookingOut])
async def get_bookings_by_status(status : str, db : Session = Depends(get_db)):
    #returns bookings by status
    bookings = db.query(ServiceBooking).filter(ServiceBooking.status == status).all()
    if not bookings:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    return bookings

@router.get("/date/{date}", response_model = list[ServiceBookingOut])
async def get_bookings_by_date(date : date, db : Session = Depends(get_db)):
    #returns bookings by its date of booking
    bookings = db.query(ServiceBooking).filter(SerivceBooking.date == date).first();
    if not bookings:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    return bookings

@router.get("/search", response_model = list[ServiceBookingOut])
async def get_booking_by_vehicle_or_customer(
        customer_id : int | None,
        vehicle_id : int | None,
        db : Session = Depends(get_db) 
        ):
    #returns booking by its customer id or vehicle id
    if customer_id is not None:
        vehicles = db.query(Customer).join(Vehicle).filter(Vehicle.customer_id == customer_id).all()
    elif vehicle_id is not None:
        vehicles = db.query(ServiceBooking).filter(ServiceBooking.vehicle_id == vehicle_id).all()
    if not vehicles:
        raise HTTPException(status_code=404, detail="Vehicles Not Found")
    return vehicles

@router.delete("/{id}")
async def delete_bookings(id : int, db : Session = Depends(get_db)):
    #delete the booking
    booking = db.query(ServiceBooking).filter(ServiceBooking.id == id).first()
    if not vehicles:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    db.delete(booking)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    db.refresh(booking)
     
@router.put("/{id}")
async def update_bookings(id : int, data : ServiceBookingUpdate, db : Session = Depends(get_db)):
    #update bookings
    booking = db.query(ServiceBooking).filter(ServiceBooking.id == id).first()
    if not vehicles:
        raise HTTPException(status_code=404, detail="Booking Not Found")
    if booking is not None:
        updated_booking = data.model_dump(exclude_unset=True)
        for key, value in updated_booking.items():
            setattr(booking, key, value)
        db.commit()
        db.refresh(booking)

@router.put("/{id}/{status}")
async def update_bookings_by_status(id : int, data : str, db : Session = Depends(get_db)):
    #update bookings by status
    booking = db.query(ServiceBooking).filter(ServiceBooking.id == id).first()
    setattr(booking, "status", data)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise     
    db.refresh(booking)


@router.post("/", response_model = ServiceBookingOut)
async def create_new_booking(data : ServiceBookingCreate, db : Session = Depends(get_db)):
    #create new booking
    list = ['routine', 'repair', 'accident', 'custom']
    new_booking = ServiceBooking(**data.dict())
    if new_booking.service_type not in list:
        raise HTTPException(status_code=400, detail="Service type not found")
    db.add(new_booking)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise
    db.refresh(new_booking)
    return new_booking

