"use client";
import React, { useState } from "react";
import { Button } from "../ui/button"; 
import { Card } from "../ui/Card";
import { Input } from "../ui/input";
import { Table } from "../ui/Table";

interface Property {
  id: number;
  "Enter City": string;
  "Property Type": string;
  "Property Buget": string;
}

const AdminPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState({ "Enter City": "", "Property Type": "", "Property Buget": "" });

  const addProperty = () => {
    if (!newProperty["Enter City"] || !newProperty["Property Type"] || !newProperty["Property Buget"]) return;
    setProperties([...properties, { id: Date.now(), ...newProperty }]);
    setNewProperty({ "Enter City": "", "Property Type": "", "Property Buget": "" });
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  const modifyProperty = (id: number, key: keyof Property, value: string) => {
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, [key]: value } : property
      )
    );
  };

  const updateProperty = (id: number) => {
    setProperties([...properties]); // This triggers a re-render to update the UI
  };

  return (
    <div className="">
      <Card className="p-4 mb-4 border-black dark:border-white">
        <h2 className="text-xl mb-2">Add Property</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter City"
            value={newProperty["Enter City"]}
            onChange={(e) => setNewProperty({ ...newProperty, "Enter City": e.target.value })}
          />
          <Input
            placeholder="Property Type"
            value={newProperty["Property Type"]}
            onChange={(e) => setNewProperty({ ...newProperty, "Property Type": e.target.value })}
          />
          <Input
            placeholder="Property Buget"
            value={newProperty["Property Buget"]}
            onChange={(e) => setNewProperty({ ...newProperty, "Property Buget": e.target.value })}
          />
          <Button onClick={addProperty}>Add</Button>
        </div>
      </Card>

      <Table  >
        <thead>
          <tr>
            <th>Enter City</th>
            <th>Property Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="p-1 text-2xl font-bold mb-4">
                <Input
                  value={property["Enter City"]}
                  onChange={(e) => modifyProperty(property.id, "Enter City", e.target.value)}
                />
              </td>
              <td className="p-1">
                <Input
                  value={property["Property Type"]}
                  onChange={(e) => modifyProperty(property.id, "Property Type", e.target.value)}
                />
              </td>
              <td className="gap 4">
                <Input
                  value={property["Property Buget"]}
                  onChange={(e) => modifyProperty(property.id, "Property Buget", e.target.value)}
                />
              </td>
              <td className="p-1 flex gap-2">
                <Button onClick={() => updateProperty(property.id)} className="bg-green-500">
                  Modify
                </Button>
                <Button onClick={() => deleteProperty(property.id)} className="bg-red-600">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
