import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "./util/api";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { countryName } = useParams();

  useEffect(() => {
    0
    const fetchCountry = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);
        if (!res.ok) throw new Error("Country not found!");
        const data = await res.json();
        setCountry(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountry();
  }, [countryName]);

  if (isLoading) return <h4>Loading...</h4>;
  if (error) return <h4>{error}</h4>;

  return (
    <div className="country-info-wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>
      {country && (
        <div className="country-info-container">
          <div className="country-info-img">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
          </div>
          <div className="country-info">
            <h3>{country.name.common}</h3>
            <div className="country-info-left">
              <h5>Population: <span>{new Intl.NumberFormat().format(country.population)}</span></h5>
              <h5>Region: <span>{country.region}</span></h5>
              {country.subregion && <h5>Sub Region: <span>{country.subregion}</span></h5>}
              <h5>Capital: <span>{country.capital?.[0]}</span></h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;