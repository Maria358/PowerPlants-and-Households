
export class World {
  constructor() {
  }

  createPowerPlant() {
    const powerPlant = {
      id: Math.random(),
      electricity: 0,
      isAlive: true,
      connectedHouseholds: [],

      getEnergy() {
        this.electricity = 100;
      },
      connectHousehold(household) {
        if (this.isAlive) {
          this.connectedHouseholds.push(household);
          this.produceEnergy(household);
        }
        return;
      },
      produceEnergy(household) {
        if (this.isAlive) {
          let certainHousehold = this.connectedHouseholds.findIndex(el => el.id === household.id);
          this.connectedHouseholds[certainHousehold].electricity += this.electricity;
        }
        return 0;
      },
      disconnectEnergy(household) {
        this.connectedHouseholds = this.connectedHouseholds.filter((el, index) => {
          if (el.id === household.id) {
            this.connectedHouseholds[index].electricity -= this.electricity;
          }
          return el.id !== household.id
        });
      },
      repairPowerPlant() {
        this.isAlive = true;
        this.connectedHouseholds.forEach((el, index) => {
          this.connectedHouseholds[index].electricity += this.electricity;
        });
      },
      killPowerPlant() {
        this.isAlive = false;
        this.connectedHouseholds.forEach((el, index) => {
          this.connectedHouseholds[index].electricity -= this.electricity;
        });
      }
    };

    return powerPlant;
  }

  createHousehold() {
    const household = {
      id: Math.random(),
      сonnectedPowerPlants: [],
      connectedHouseholds: [],
      electricity: 0,

      householdHasEletricity() {
        return !!this.electricity;
      },
      produceEnergytoConnectedHouse(household) {
        const alivePowerPlants = this.сonnectedPowerPlants.some(el => el.isAlive === true);
        if (alivePowerPlants) {
          let certainHousehold = this.connectedHouseholds.findIndex(el => el.id === household.id);
          this.connectedHouseholds[certainHousehold].electricity += 100;
        }
        return 0;
      },
      addPowerPlant(powerPlant) {
        this.сonnectedPowerPlants.push(powerPlant);
      },
      connectHousehold(household) {
        this.connectedHouseholds.push(household);
        this.produceEnergytoConnectedHouse(household);
      },
      updateConnectedPowerPlants(powerPlant) {
        this.сonnectedPowerPlants = this.сonnectedPowerPlants.filter(el => el.id !== powerPlant.id)
      }
    };

    return household;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.addPowerPlant(powerPlant);
    powerPlant.getEnergy();
    powerPlant.connectHousehold(household);

  }

  connectHouseholdToHousehold(household1, household2) {
    household1.connectHousehold(household2);
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    powerPlant.disconnectEnergy(household);
    household.updateConnectedPowerPlants(powerPlant);
  }

  killPowerPlant(powerPlant) {
    powerPlant.killPowerPlant();
  }

  repairPowerPlant(powerPlant) {
    powerPlant.repairPowerPlant();
  }

  householdHasEletricity(household) {
    return household.householdHasEletricity();
  }
}
