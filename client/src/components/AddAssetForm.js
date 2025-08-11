import React, { useState } from 'react';

const AddAssetForm = () => {
  const [form, setForm] = useState({
    assetTag: '',
    assetType: '',
    manufacturer: '',
    model: '',
    serialNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to add asset');
      setSuccess('Asset added successfully!');
      setForm({ assetTag: '', assetType: '', manufacturer: '', model: '', serialNumber: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Add New Asset</h2>
      <div>
        <label>Asset Tag: <input name="assetTag" value={form.assetTag} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Asset Type: <input name="assetType" value={form.assetType} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Manufacturer: <input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Model: <input name="model" value={form.model} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Serial Number: <input name="serialNumber" value={form.serialNumber} onChange={handleChange} /></label>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Asset'}</button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default AddAssetForm;
