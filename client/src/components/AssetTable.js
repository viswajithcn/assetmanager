import React, { useEffect, useState } from 'react';

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) throw new Error('Failed to fetch assets');
        const data = await response.json();
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredAssets = assets.filter(asset =>
    (asset.assetTag && asset.assetTag.toLowerCase().includes(search.toLowerCase())) ||
    (asset.model && asset.model.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by Asset Tag or Model..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 6, width: 250 }}
        />
      </div>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Asset Tag</th>
            <th>Type</th>
            <th>Status</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map(asset => (
            <tr key={asset._id}>
              <td>{asset.assetTag}</td>
              <td>{asset.assetType}</td>
              <td>{asset.status}</td>
              <td>{asset.manufacturer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
