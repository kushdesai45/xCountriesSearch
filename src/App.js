import './App.css';
import { useState,useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function App() {
  const [countries,setCountries] = useState([]);
  const [searchValue,setSearchValue] = useState('');
  const [updatedCountries,setUpdatedCountries] = useState([]);

  useEffect(()=>{
    if(searchValue){
      performSearch(searchValue);
    }  
  },[searchValue])

  const getCountries = async() => {
    try{
      const url = 'https://xcountries-backend.azurewebsites.net/all';
      let data = await axios.get(url);
      setCountries(data?.data);
      setUpdatedCountries(data?.data);
      // return data?.data;
    }catch(error){
      console.error("Error fetching data:",error.message);
    }
  }

  const performSearch = (value) => {
    if (searchValue) {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setUpdatedCountries(filtered);
    } else {
      setUpdatedCountries(countries);  // Reset to all countries if input is cleared
    }
  }

  useEffect(()=>{
    const load = async() => {
      getCountries();
    }
    load();
  },[])

  return (
    <>
    <input type="text" placeholder='Search for countries' style={{width:'50%'}}
      onChange={(e)=>{
        e.preventDefault();
        setSearchValue(e.target.value)
      }}
    />
    <div className="container">
      {
        updatedCountries && updatedCountries?.map((country,idx)=>(
          <div className='countryContainer' key={idx}>
            <img src={country?.flag} alt={country?.name} className='countryImg'/>
            <p>{country?.name}</p>
          </div>
        ))
      }
    </div>
    </>
  );
}

export default App;