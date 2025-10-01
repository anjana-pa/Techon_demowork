import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; 

const ROWS_PER_PAGE = 10; 

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // --- Data Fetching ---
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await api.get('/departments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response && error.response.status === 401) {
             alert("Session expired or unauthorized. Please log in again.");
             localStorage.removeItem('token');
             navigate('/login');
        } else {
             alert("Failed to load departments. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [navigate]); 
  const filteredDepartments = useMemo(() => {
    setCurrentPage(1); 
    
    if (!searchTerm) return departments;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return departments.filter(dept =>
      dept.name.toLowerCase().includes(lowerCaseSearch) ||
      dept.description.toLowerCase().includes(lowerCaseSearch)
    );
  }, [departments, searchTerm]);

  const totalPages = Math.ceil(filteredDepartments.length / ROWS_PER_PAGE);

  const displayedDepartments = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return filteredDepartments.slice(start, end);
  }, [filteredDepartments, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(prev => prev.filter(dept => dept._id !== id));
      alert("Department successfully deleted!");
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department. Please check server logs.");
    }
  };

  if (loading) {
    return (
      <div className="content-container">
        <p className="loading-text">Loading department data...</p>
      </div>
    );
  }

  return (
    <div className="content-container"> 
      <h2 className="content-title">Department Directory</h2>
      
      <button 
        className="submit-btn add-btn-style" 
        onClick={() => navigate('/departments/add')}
      >
        + Add New Department
      </button>

      <input
        type="text"
        placeholder="Search departments by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {displayedDepartments.length === 0 && (
        <p className="no-results">No departments found matching "{searchTerm}".</p>
      )}

      {displayedDepartments.length > 0 && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th className="table-th">Name</th>
                <th className="table-th">Description</th>
                <th className="table-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedDepartments.map((dept) => (
                <tr key={dept._id} className="table-row">
                  <td className="table-td">{dept.name}</td>
                  <td className="table-td">{dept.description}</td>
                  <td className="table-td">
                    <button
                      className="action-link-view"
                      onClick={() => navigate(`/departments/${dept._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="action-link-delete"
                      onClick={() => handleDelete(dept._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? 'active-page' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}