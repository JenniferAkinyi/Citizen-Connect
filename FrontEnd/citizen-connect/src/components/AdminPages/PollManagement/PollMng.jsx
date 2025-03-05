import React, { useState, useEffect } from "react";
import AreaTableAction from "./AreaTableAction";
import { pollVote } from "../../../services/api";
import './PollMng.css';

const TABLE_HEADS = [
  "ID",
  "Question",
  "Description",
  "CreatedAt",
  "ClosesAt",
  "Votes",
  "Action",
];

const PollMng = () => {
  const [poll, setPoll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPolls = async () => {
    try {
      const response = await pollVote();
      if (Array.isArray(response.data)) {
        setPoll(response.data);
      } else {
        console.error("API response is not an array");
      }
    } catch (error) {
      console.error("Error fetching poll:", error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (pollId) => {
    setPoll(poll.filter(p => p.id !== pollId));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(poll) ? poll.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage) : [];
  const totalPages = Math.ceil(poll.length / itemsPerPage);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Manage Polls</h4>
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
                <td>{dataItem.question}</td>
                <td>{dataItem.description}</td>
                <td>{new Date(dataItem.createdAt).toLocaleDateString()}</td>
                <td>{new Date(dataItem.expiresAt).toLocaleDateString()}</td>
                <td>{dataItem.totalVotes}</td>
                <td className="dt-cell-action">
                  <AreaTableAction id={dataItem.id} onDelete={handleDelete} />
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

export default PollMng;