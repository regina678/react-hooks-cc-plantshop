import React from "react";

function PlantCard({ plant, onUpdatePlant }) {
  const { name, image, price, isSoldOut } = plant;

  function handleClick() {
    const updatedPlant = {
      ...plant,
      isSoldOut: !plant.isSoldOut
    };
    onUpdatePlant(updatedPlant);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <button className={isSoldOut ? "sold-out" : ""} onClick={handleClick}>
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
