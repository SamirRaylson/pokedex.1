import './App.css';
import { useState } from 'react';

function App() {
  const [pokeSearh, setPokeSearch] = useState("")
  const [data, setData] = useState ("");
  const [pokePhoto, setPokePhoto] = useState("");

  const handleOnChange = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.value);
  };

  const fetchpokemon = async (pokeSearh) => {
    try {
      const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeSearh}`
      )
      const dataAPI = await APIResponse.json();
      setData(dataAPI);
    } catch(err) {
      console.log(err);
    }
  };
  
  
  let pokemonImage = "";
  let pokeId = "";
  let pokeNome = ""
  let pokeAttack = '';
  let pokeDefense = '';
  let pokeType = '';
  let pokeHP = "";
  let pokeSpeed = "";
  let pokeSpecialAttack = "";
  let pokeSpecialDefense = "";
 

  if (data) {
    pokemonImage = 
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    pokeNome = data["species"]["name"];
    pokeId = data.id;
    pokeAttack = data.stats[1].base_stat; 
    pokeDefense = data.stats[2].base_stat; 
    pokeType = data.types[0].type.name; 
    pokeHP = data.stats[0].base_stat;
    pokeSpeed = data.stats[5].base_stat;
    pokeSpecialAttack = data.stats[3].base_stat;
    pokeSpecialDefense = data.stats[4].base_stat;
    
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <main className='h-screen w-screen bg-gradient-to-b from-green-200 to-green-400 flex justify-center items-center flex-col-reverse'>
      <section className='bg-white w-96 h-96 rounded-lg relatve mt-2'>
        <h1 className='text-center font-bold mt-5 text-2x1 text-black'>
          {capitalizeFirstLetter(pokeNome)}
        </h1>
        <img className='absolute bottom-[17%] left-[53%] transform -translate-x-[63%] -translate-y-[20%] h-[30%]'
        src={pokemonImage}
        alt=""
        >
        </img>

        <div className='text-center mt-1'>
  <div className='grid grid-cols-3 gap-4'>
    <div>
      <p>ID: {pokeId}</p>
      <p>Tipo: {capitalizeFirstLetter(pokeType)}</p>
      <p className='w-40'>Attack Special: {pokeSpecialAttack}</p>
    </div>
    <div>
      <p>Ataque: {pokeAttack}</p>
      <p>Defesa: {pokeDefense}</p>
      <p className='w-40 ml-20'>Defense Special: {pokeSpecialDefense}</p>
    </div>
    <div>
      <p>HP: {pokeHP}</p>
      <p>Velocidade: {pokeSpeed}</p>
      
    </div>
  </div>
</div>

      </section>
      <div className='flex gap-5 mt-1 mr-20'>
        <input 
        className='bg-white rounded-md'
        onChange={handleOnChange}
        placeholder='Enter Pokemon name'>         
        </input>
        <button className='bg-blue-500 rounded-md px-4 py-2' onClick={() => fetchpokemon(pokeSearh)}>Procurar</button>
      </div>
    </main>
  );
}

export default App;
