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
    setPage(0);
    setSearchTerm(searchTerm);
  };

  const onResetClick = () => {
    setSearchTerm("");
    setPage(0);
  };

  const loadMore = () => {
    loadAdvocates(true);
  }

  return (
    <main style={{ margin: "24px" }}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Solace Advocates</h1>
        <h2 className="text-gray-700">Advocate Search</h2>
      </div>

      <div>

        <p className="mb-2">
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input className="border border-gray-200 p-2 rounded" value={searchTerm} onChange={onChange} placeholder="Search by any field"/>
        <button className="ms-2 p-2 rounded bg-gray-200 hover:bg-gray-100" onClick={onResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="table-auto md:min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
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
      <div className="w-full justify-center flex mt-4">
        {advocates.length > 0 ?
            <button onClick={loadMore}  className="ms-2 p-2 rounded bg-gray-200 hover:bg-gray-100">Load More</button>
            :
            <div>No results for search terms</div>}
      </div>

    </main>
  );
}
