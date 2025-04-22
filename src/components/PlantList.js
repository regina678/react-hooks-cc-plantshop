import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePlant }) {
  return (
    <ul className="cards" data-testid="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onUpdatePlant={onUpdatePlant}
          data-testid="plant-item"
        />
      ))}
    </ul>
  );
}

export default PlantList;