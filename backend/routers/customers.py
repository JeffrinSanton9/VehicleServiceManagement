#importing dependencies
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.customer import CustomerCreate, CustomerUpdate, CustomerBase, CustomerOut
from database.database import get_db
from models.customer import Customer
from fastapi import HTTPException

#customer router init
router = APIRouter(prefix="/customers", tags=["customers"])
@router.get("/", response_model=list[CustomerOut])
async def get_customers(db : Session = Depends(get_db)):
    #returns all the customer's details
    customers = db.query(Customer).all()
    if not customers:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customers

@router.get("/search", response_model=CustomerOut)
async def search_customer(
        name : str | None = None,
        email : str | None = None, 
        phoneNumber : str | None = None,
        db : Session = Depends(get_db)
        ):
    #returns the customer with name or email or phone number.
    if name != None:
        customer = db.query(Customer).filter(Customer.name == name).first()
    elif email != None:
        customer = db.query(Customer).filter(Customer.email == email).first()
    elif phoneNumber != None:
        customer = db.query(Customer).filter(Customer.phone == phoneNumber).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/id/{id}", response_model=CustomerOut)
async def get_customer_by_id(id : int, db : Session = Depends(get_db)):
    #returns customer by id
    customer = db.query(Customer).filter(Customer.id == id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.delete("/{id}")
async def delete_customer(id : int, db : Session = Depends(get_db)):
    #delete the customer by id.
    customer = db.query(Customer).filter(Customer.id == id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Failed to delete customer")
    
@router.post("/")
async def create_customer(data : CustomerCreate, db : Session = Depends(get_db)):
    new_customer = Customer(**data.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer

@router.put("/{id}")
async def update_customer_by_id(id : int, data : CustomerUpdate, db : Session = Depends(get_db)):
    #update the element by id Logic
    customer = db.query(Customer).filter(Customer.id == id).first()
    updated_data = data.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(customer, key, value)
    db.commit()
    db.refresh(customer)



