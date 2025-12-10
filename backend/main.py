from routers.customers import router as customer_router
from routers.vehicles import router as vehicle_router
from fastapi.middleware.cors import CORSMiddleware
from routers.services import router as service_router 
from fastapi import FastAPI

#app init
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # During development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(customer_router)
app.include_router(vehicle_router)
app.include_router(service_router)
