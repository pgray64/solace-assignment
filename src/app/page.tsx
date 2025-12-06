"use client";

import { useEffect, useState } from "react";
import {useDebounce} from "./hooks/useDebounce";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Array<string>;
  yearsOfExperience: number;
  phoneNumber: string;
}
export default function Home() {
  const [advocates, setAdvocates] = useState([] as Advocate[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    loadAdvocates();
  }, [debouncedSearchTerm]);

  function loadAdvocates(append?: boolean | undefined) {
    const queryParams = new URLSearchParams({
      searchQuery: debouncedSearchTerm,
      page: page + ""
    })
    fetch(`/api/advocates?${queryParams}`).then((response) => {
      response.json().then((jsonResponse) => {
        if (append) {
          setAdvocates([...advocates, ...jsonResponse.data]);
        } else {
          setAdvocates(jsonResponse.data);
        }
        setPage(page + 1);
      });
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const onResetClick = () => {
    setSearchTerm("");
  };

  const loadMore = () => {
    loadAdvocates(true);
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={onChange} />
        <button onClick={onResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={advocate.id + "_" + s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={loadMore}>Load More</button>
    </main>
  );
}
