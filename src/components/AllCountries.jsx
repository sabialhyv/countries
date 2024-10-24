import React, { useState, useEffect } from "react";
import { apiURL } from "./util/api";
import SearchInput from "./SearchInput";
import FilterCountry from "./FilterCountry";
import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${apiURL}/all`);
  }, []);

  const handleSearch = (countryName) => {
    setIsLoading(true);
    fetchData(`${apiURL}/name/${countryName}`);
  };

  const handleFilter = (regionName) => {
    setIsLoading(true);
    fetchData(`${apiURL}/region/${regionName}`);
  };

  return (
    <div className="all-country-wrapper">
      <div className="country-top">
        <div className="search">
          <SearchInput onSearch={handleSearch} />
        </div>

        <div className="filter">
          <FilterCountry onSelect={handleFilter} />
        </div>
      </div>

      <div className="country-bottom">
        {isLoading && !error && <h4>Loading...</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link key={country.cca3} to={`/country/${country.name.common}`}>
            <div className="country-card">
              <div className="country-img">
                <img src={country.flags.png} alt={`${country.name.common} flag`} />
              </div>
              <div className="country-data">
                <h3>{country.name.common}</h3>
                <h6> Population: {new Intl.NumberFormat().format(country.population)}</h6>
                <h6> Region: {country.region}</h6>
                <h6> Capital: {country.capital?.[0]}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;