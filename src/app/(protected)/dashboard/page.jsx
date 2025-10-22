import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to project-anggota-holding dashboard
    navigate("/project-anggota-holding", { replace: true });
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '16px',
      color: '#666'
    }}>
      Redirecting to Dashboard...
    </div>
  );
};

export default Dashboard;
