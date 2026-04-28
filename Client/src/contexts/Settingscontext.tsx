import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface SettingsContextType {
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  logoUrl: string;
  dashboardName: string;
  loading: boolean;
  updateGeneralSettings: (data: any) => Promise<void>;
  updateDashboardName: (name: string) => Promise<void>;
  uploadLogo: (file: File) => Promise<string>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteName, setSiteName] = useState('GTXNodes');
  const [siteEmail, setSiteEmail] = useState('');
  const [sitePhone, setSitePhone] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [dashboardName, setDashboardName] = useState('My Dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      setSiteName(res.data.siteName || 'GTXNodes');
      setSiteEmail(res.data.siteEmail || '');
      setSitePhone(res.data.sitePhone || '');
      setLogoUrl(res.data.logoUrl || '');
      
      const dashboardRes = await api.get('/settings/dashboard-name');
      setDashboardName(dashboardRes.data.dashboardName || 'My Dashboard');
    } catch (err) {
      console.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const updateGeneralSettings = async (data: any) => {
    await api.put('/settings/general', data);
    if (data.siteName) setSiteName(data.siteName);
    if (data.siteEmail) setSiteEmail(data.siteEmail);
    if (data.sitePhone) setSitePhone(data.sitePhone);
  };

  const updateDashboardName = async (name: string) => {
    await api.put('/settings/dashboard-name', { dashboardName: name });
    setDashboardName(name);
  };

  const uploadLogo = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('logo', file);
    const res = await api.post('/settings/upload-logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setLogoUrl(res.data.logoUrl);
    return res.data.logoUrl;
  };

  return (
    <SettingsContext.Provider value={{
      siteName, siteEmail, sitePhone, logoUrl, dashboardName, loading,
      updateGeneralSettings, updateDashboardName, uploadLogo
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
