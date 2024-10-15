import { useState, useEffect } from "react";
import { companyData } from "../data/CompanyDropdown";
import { AutoComplete } from "primereact/autocomplete";

const CompanyDropdown = () => {
  const [countries, setCountries] = useState([...companyData]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    let tempcountries = countries.map((country) => ({
      ...country,
      label: `${country.companyCode} - ${country.name}`,
    }));
    setCountries(tempcountries);
    setFilteredCountries(tempcountries.slice(0, 10));
  }, []);

  const search = (event) => {
    console.log(event, selectedCountry);
    // Timeout to emulate a network connection
    setTimeout(() => {
      let filtered = countries.filter((item) => {
        return (
          item.name.toLowerCase().includes(event.query.toLowerCase()) ||
          item.companyCode.toLowerCase().includes(event.query.toLowerCase())
        );
      });
      setFilteredCountries(filtered.slice(0, 10));
    }, 250);
  };

  return (
    <AutoComplete
      onKeyUp={(e) => console.log(selectedCountry, e, "keyup")}
      field="name"
      value={selectedCountry}
      suggestions={filteredCountries}
      completeMethod={search}
      onChange={(e) => setSelectedCountry(e)}
      dropdown
    />
  );
};

export default CompanyDropdown;
