import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress1(user.address1 || '');
      setCity(user.city || '');
      setCountry(user.country || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      await updateProfile({ name, email, phone, address1, city, country });
      setMessage('Profile updated successfully');
    } catch (err: any) {
      setMessage(err?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <p className="text-gray-700">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className={`text-sm rounded p-3 ${message.includes('successfully') ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'}`}>
                {message}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">This is how your account is identified.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{user?.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Name</span><span className="font-medium">{user?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Loyalty Points</span><span className="font-medium">{user?.loyaltyPoints}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Tier</span><span className="font-medium capitalize">{user?.tier}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
