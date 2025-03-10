import React, { useState, useEffect } from "react";
import AreaTableAction from "./AreaTableAction";
import { fetchIncidents } from "../../../../services/api";
import "./AreaTable.css";

const TABLE_HEADS = [
  "ID",
  "Title",
  "Location",
  "Category",
  "Status",
  "CreatedAt",
  "Action",
];

const AreaTable = () => {
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await fetchIncidents();
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    getIncidents();
  }, []);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incidents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incidents.length / itemsPerPage);
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Recently Reported Incidents</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.id}</td>
                <td>{dataItem.title}</td>
                <td>{dataItem.location}</td>
                <td>{dataItem.category}</td>
                <td>{dataItem.status}</td>
                <td>
                  <div className="dt-status">
                    <span
                      className={`dt-status-dot dot-${
                        dataItem.status?.toLowerCase() || "unknown"
                      }`}
                    ></span>
                    <span className="dt-status-text">
                      {new Date(dataItem.createdAt ).toLocaleDateString() || "Unknown"}
                    </span>
                  </div>
                </td>
                <td className="dt-cell-action">
                  <AreaTableAction ParcelID={dataItem.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreaTable;
