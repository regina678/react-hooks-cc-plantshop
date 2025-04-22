import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, searchTerm, onSearchChange, onAddPlant, onUpdatePlant }) {
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <PlantList plants={filteredPlants} onUpdatePlant={onUpdatePlant} />
    </main>
  );
}

export default PlantPage;