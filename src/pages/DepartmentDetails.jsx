import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function DepartmentDetails() {
  const { deptId } = useParams();
  const [dept, setDept] = useState(null);

  useEffect(() => {
    api.get(`/department/${deptId}`)
      .then((res) => setDept(res.data))
      .catch(() => alert("Failed to fetch department"));
  }, [deptId]);

  if (!dept) return <p className="loading-text">Loading...</p>;

  return (
    <div className="login-container"> 
      <div className="details-card">
        <h2 className="details-title">{dept.dept_name}</h2>
        <p className="details-description">{dept.description}</p>
      </div>
    </div>
  );
}