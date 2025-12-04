from pydantic import BaseModel, EmailStr

class CustomerBase(BaseModel):
    name : str
    email : EmailStr
    phone : str
    address : str

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    id : int | None = None
    name : str | None = None
    email : EmailStr | None = None
    phone : str | None = None
    address : str | None = None

class CustomerOut(CustomerBase):
    id : int
    class Config:
        orm_mode = True
