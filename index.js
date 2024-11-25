document.addEventListener("DOMContentLoaded", () => {
  const tablename = ["BigCats", "Dogs", "BigFish"];
  const Species = ["BigCats", "Dogs", "BigFish"];
  const Name = [
    "Tiger", "Lion", "Leopard", "Cheetah", "Caracal", "Jaguar",
    "Rottweiler", "German Shepherd", "Labrador", "Alabai",
    "Humpback Whale", "Killer Whale", "Tiger Shark", "Hammerhead Shark"
  ];
  const Size = [10, 8, 5, 5, 3, 5, 2, 2, 2, 4, 15, 12, 8, 8];
  const Location = [
    "Asia", "Africa", "Africa and Asia", "Africa", "Africa", "Amazon",
    "Germany", "Germany", "UK", "Turkey", "Atlantic Ocean", "Atlantic Ocean",
    "Ocean", "Ocean"
  ];
  const image = [
    './assets/tiger.png', './assets/lion.png', './assets/leopard.png', './assets/cheetah.png', './assets/caracal.png', './assets/jaguar.png',
    './assets/Rotwailer.png', './assets/germanshepherd.png', './assets/labrodar.png', './assets/alabai.png',
    './assets/humpbackwhale.png', './assets/killerwhale.png', './assets/tigershark.png', './assets/HammerheadHead.png'
  ];

  // Check if structuredData exists in localStorage, otherwise initialize it
  const savedData = localStorage.getItem('animalData');
  const structuredData = savedData ? JSON.parse(savedData) : {
    BigCats: [],
    Dogs: [],
    BigFish: []
  };

  // Populate structuredData with default data if it's empty
  if (structuredData.BigCats.length === 0) {
    Name.forEach((name, index) => {
      let species = "Unknown";
      let table = null;

      if (index < 6) {
        species = "BigCats";
        table = "BigCats";
      } else if (index < 10) {
        species = "Dogs";
        table = "Dogs";
      } else {
        species = "BigFish";
        table = "BigFish";
      }

      structuredData[table].push({
        Species: species,
        Name: name,
        Size: Size[index] || null,
        Location: Location[index] || "Unknown",
        Image: image[index] || './assets/alabai.png'  // Default fallback image
      });
    });

    // Save the initial data to localStorage
    localStorage.setItem('animalData', JSON.stringify(structuredData));
  }

  const animalRowsDiv = document.getElementById("animal-rows");

  if (!animalRowsDiv) {
    console.error("Element with id 'animal-rows' not found.");
    return;
  }

  function renderAnimals(speciesArray) {
    animalRowsDiv.innerHTML = ""; // Clear previous content
    speciesArray.forEach(animal => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-6 col-sm-3 border border-dark ml-0 ";

      let nameStyle = "";
      if (animal.Species === "BigCats") {
        nameStyle = "font-weight: bold;";
      } else if (animal.Species === "Dogs") {
        nameStyle = "font-style: italic;";
      } else if (animal.Species === "BigFish") {
        nameStyle = "color: blue;";
      }

      colDiv.innerHTML = `
      <div style="margin-top:10px;margin-bottom:10px">
        <button class="btn btn-danger remove-animal" data-name="${animal.Name}">Remove</button>
        <button class="btn btn-success edit-animal" data-name="${animal.Name}">Edit</button>
        <h6 style="display: flex; justify-content">Species: ${animal.Species}</h6>
        <h6 style="display: flex; justify-content; ${nameStyle}">Name: ${animal.Name}</h6>
        <h6 style="display: flex; justify-content">Size: ${animal.Size} ft</h6>
        <h6 style="display: flex; justify-content">Location: ${animal.Location}</h6>
        <img src="${animal.Image}" alt="${animal.Name}" style="display: flex; justify-content" class="img-fluid w-20 h-20">
      </div>
      `;

      // Append the column to the row
      animalRowsDiv.appendChild(colDiv);
    });
  }

  // Initial render
  renderAnimals(Object.values(structuredData).flat());

  // Add New Animal functionality (Modal and Form)
  document.getElementById('add-animal-btn').addEventListener('click', () => {
    const addAnimalModal = new bootstrap.Modal(document.getElementById('add-animal-modal'));
    addAnimalModal.show();
  });

  document.getElementById('add-animal-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const species = document.getElementById('species').value;
    const name = document.getElementById('name').value;
    const size = parseInt(document.getElementById('size').value, 10);
    const location = document.getElementById('location').value;
    const imageSrc = document.getElementById('image').value;

    // If imageSrc is empty or invalid, fall back to default image
    const validImageSrc = imageSrc.trim() !== "" ? imageSrc : './assets/alabai.png';

    const newAnimal = {
      Species: species,
      Name: name,
      Size: size,
      Location: location,
      Image: validImageSrc
    };

    structuredData[species].push(newAnimal);

    // Save the updated data to localStorage
    localStorage.setItem('animalData', JSON.stringify(structuredData));

    renderAnimals(Object.values(structuredData).flat());

    const addAnimalModal = new bootstrap.Modal(document.getElementById('add-animal-modal'));
    addAnimalModal.hide();
  });

  // Sorting functionality
  document.getElementById('sort-name').addEventListener('click', () => {
    const sortedAnimals = Object.values(structuredData)
      .flat()
      .sort((a, b) => a.Name.localeCompare(b.Name));
    renderAnimals(sortedAnimals);
  });

  document.getElementById('sort-size').addEventListener('click', () => {
    const sortedAnimals = Object.values(structuredData)
      .flat()
      .sort((a, b) => a.Size - b.Size);
    renderAnimals(sortedAnimals);
  });

  document.getElementById('sort-species').addEventListener('click', () => {
    const sortedAnimals = Object.values(structuredData)
      .flat()
      .sort((a, b) => a.Species.localeCompare(b.Species));
    renderAnimals(sortedAnimals);
  });

  // Remove Animal functionality
  animalRowsDiv.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('remove-animal')) {
      const animalName = e.target.getAttribute('data-name');

      Object.values(structuredData).forEach(speciesArray => {
        const index = speciesArray.findIndex(animal => animal.Name === animalName);
        if (index > -1) {
          speciesArray.splice(index, 1);
        }
      });

      // Save the updated data to localStorage
      localStorage.setItem('animalData', JSON.stringify(structuredData));

      renderAnimals(Object.values(structuredData).flat());
    }
  });
});
  