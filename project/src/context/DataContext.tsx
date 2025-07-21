import React, { createContext, useContext, useState } from 'react';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  area: number;
  type: string;
  expectedYield: number;
  riskScore: number;
  investmentScore: number;
}

interface DataContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  addPropertiesFromFile: (properties: Omit<Property, 'id'>[]) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getAnalytics: () => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Commercial Complex - BKC',
      location: 'Bandra Kurla Complex, Mumbai',
      price: 15000000, // 1.5 Crores
      area: 2500,
      type: 'Commercial',
      expectedYield: 8.5,
      riskScore: 25,
      investmentScore: 87
    },
    {
      id: '2',
      name: 'Tech Park - Whitefield',
      location: 'Whitefield, Bengaluru',
      price: 8500000, // 85 Lakhs
      area: 1800,
      type: 'Office',
      expectedYield: 9.2,
      riskScore: 15,
      investmentScore: 92
    },
    {
      id: '3',
      name: 'Retail Space - Cyber City',
      location: 'Cyber City, Gurgaon',
      price: 12000000, // 1.2 Crores
      area: 3200,
      type: 'Retail',
      expectedYield: 7.8,
      riskScore: 30,
      investmentScore: 78
    }
  ]);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString()
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const addPropertiesFromFile = (newProperties: Omit<Property, 'id'>[]) => {
    const propertiesWithIds: Property[] = newProperties.map(prop => ({
      ...prop,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setProperties(prev => [...prev, ...propertiesWithIds]);
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updatedProperty } : prop
    ));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
  };

  const getAnalytics = () => {
    if (properties.length === 0) {
      return {
        totalValue: 0,
        avgYield: 0,
        avgRisk: 0,
        avgScore: 0,
        propertyCount: 0
      };
    }
    
    const totalValue = properties.reduce((sum, prop) => sum + prop.price, 0);
    const avgYield = properties.reduce((sum, prop) => sum + prop.expectedYield, 0) / properties.length;
    const avgRisk = properties.reduce((sum, prop) => sum + prop.riskScore, 0) / properties.length;
    const avgScore = properties.reduce((sum, prop) => sum + prop.investmentScore, 0) / properties.length;

    return {
      totalValue,
      avgYield,
      avgRisk,
      avgScore,
      propertyCount: properties.length
    };
  };

  return (
    <DataContext.Provider value={{
      properties,
      addProperty,
      addPropertiesFromFile,
      updateProperty,
      deleteProperty,
      getAnalytics
    }}>
      {children}
    </DataContext.Provider>
  );
};