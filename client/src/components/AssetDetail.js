import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AssetDetail = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await fetch(`/api/assets/${id}`);
        if (!response.ok) throw new Error('Failed to fetch asset');
        const data = await response.json();
        setAsset(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  const handleCheckout = async () => {
    setActionLoading(true);
    setActionError(null);
    try {
      // For demo, prompt for userId
      const userId = prompt('Enter User ID to assign:');
      if (!userId) throw new Error('User ID is required');
      const response = await fetch(`/api/assets/${id}/checkout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (!response.ok) throw new Error('Failed to check out asset');
      const data = await response.json();
      setAsset(data);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckin = async () => {
    setActionLoading(true);
    setActionError(null);
    try {
      const response = await fetch(`/api/assets/${id}/checkin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!response.ok) throw new Error('Failed to check in asset');
      const data = await response.json();
      setAsset(data);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading asset details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!asset) return <div>Asset not found.</div>;

  return (
    <div>
      <h2>Asset Details</h2>
      <ul>
        {Object.entries(asset).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}</li>
        ))}
      </ul>
      {asset.status === 'In Stock' && (
        <button onClick={handleCheckout} disabled={actionLoading}>
          {actionLoading ? 'Checking out...' : 'Check-out'}
        </button>
      )}
      {asset.status === 'In Use' && asset.assignedTo && (
        <div>
          <h3>Assigned User</h3>
          <pre>{typeof asset.assignedTo === 'object' ? JSON.stringify(asset.assignedTo, null, 2) : asset.assignedTo}</pre>
          <button onClick={handleCheckin} disabled={actionLoading}>
            {actionLoading ? 'Checking in...' : 'Check-in'}
          </button>
        </div>
      )}
      {actionError && <div style={{ color: 'red' }}>Error: {actionError}</div>}
    </div>
  );
};

export default AssetDetail;
