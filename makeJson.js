const tablename = ["BigCats", "Dogs", "BigFish"];
const Species = ["BigCats", "Dogs", "BigFish"];
const Name = [
  "Tiger", "Lion", "Leopard", "Cheetah", "Caracal", "Jaguar",
  "Rottweiler", "German Shepherd", "Labrador", "Alabai",
  "Humpback Whale", "Killer Whale", "Tiger Shark", "Hammerhead Shark"
];
const Size = [10, 8, 5, 5, 3, 5, 2,2,2, 4, 15, 12, 8, 8];
const Location = ["Asia", "Africa", "Africa and Asia","Africa","Africa","Amazon", "Germany","Germany" ,"UK", "Turkey", "Atlantic Ocean","Atlantic Ocean","Ocean","Ocean"];


const structuredData = {};

tablename.forEach((table, index) => {
  structuredData[table] = Name
    .slice(index * 6, (index + 1) * 6) 
    .map((Name, i) => ({
      Species: Species[index],
      Name: Name,
      Size: Size[index * 6 + i] || null,
      Location: Location[index * 6 + i] || "Unknown" 
    }));
});

console.log(JSON.stringify(structuredData, null, 2));
