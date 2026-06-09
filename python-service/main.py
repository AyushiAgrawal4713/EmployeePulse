from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():

    return {
        "message": "EmployeePulse Python API"
    }

@app.get("/engagement-score")
def score():

    return {
        "engagement_score": 85
    }

@app.get("/recommendation")
def recommendation():

    happy = 20
    stressed = 60

    if stressed > 50:

        recommendation = \
        "Conduct Team Building Activity"

    elif happy > 70:

        recommendation = \
        "Reward Top Employees"

    else:

        recommendation = \
        "Maintain Current Engagement Strategy"

    return {

        "recommendation":
        recommendation

    }