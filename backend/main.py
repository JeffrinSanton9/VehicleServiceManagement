from routers.customers import router as customer_router
from routers.vehicles import router as vehicle_router
from fastapi import FastAPI

#app init
app = FastAPI()

app.include_router(customer_router)
app.include_router(vehicle_router)

