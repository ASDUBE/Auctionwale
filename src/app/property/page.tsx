"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyData from "@/components/PropertyCard/propertData"; // Ensure this path and casing are correct

interface Property {
  ID: string;
  Property_Type: string;
  Property_Address: string;
  Current_Auction_Reserve_Price: number;
  Image_Url: string;
  // Add any additional fields as needed
}

export default function PropertyPage() {
  const searchParams = useSearchParams();

  const filter = {
    city: searchParams.get("city") || "",
    locality: searchParams.get("locality") || "",
    propertyType: searchParams.get("propertyType") || "",
    budget: searchParams.get("budget") || "",
  };

  const parseBudget = (budget: string): number => {
    if (!budget) return 0;
    budget = budget.replace(/,/g, "").toLowerCase();
    const numberPattern = /[\d.]+/g;
    const textPattern = /[a-z]+/g;
    const numberMatch = budget.match(numberPattern);
    const textMatch = budget.match(textPattern);
    const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
    const unit = textMatch ? textMatch[0] : "";

    if (isNaN(number)) return 0;

    switch (unit) {
      case "lakh":
        return number * 100000;
      case "crore":
      case "cr":
        return number * 10000000;
      default:
        return number;
    }
  };

  const formatPrice = (price: number): string => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + " crore";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + " lakh";
    }
    return price.toString();
  };

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    const addressIncludes = (searchString: string) =>
      p.Property_Address.toLowerCase().includes(searchString.toLowerCase());

    const isValidProperty =
      p.ID &&
      p.Property_Type &&
      p.Property_Type.toLowerCase() !== "link" &&
      p.Property_Address &&
      p.Property_Address.toLowerCase() !== "link" &&
      !isNaN(p.Current_Auction_Reserve_Price) &&
      p.Current_Auction_Reserve_Price > 0;

    const isWithinBudget = (): boolean => {
      if (filter.budget === "") return true;
      const budgetValue = parseBudget(filter.budget);
      return p.Current_Auction_Reserve_Price <= budgetValue;
    };

    return (
      isValidProperty &&
      (filter.city === "" || addressIncludes(filter.city)) &&
      (filter.locality === "" || addressIncludes(filter.locality)) &&
      (filter.propertyType === "" ||
        p.Property_Type.toLowerCase().includes(filter.propertyType.toLowerCase())) &&
      isWithinBudget()
    );
  });

  return (
    <div className="container mt-20 flex flex-wrap gap-8 p-12">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredProperties.length > 0 ? (
        filteredProperties.map((property) => (
          <PropertyData
            key={property.ID}
            imageUrl={property.Image_Url}
            name={property.Property_Type}
            location={property.Property_Address}
            price={formatPrice(property.Current_Auction_Reserve_Price)}
          />
        ))
      ) : (
        <div className="mb-20 mt-20 w-full text-center text-xl font-bold text-gray-300">
          No properties available for the selected criteria
        </div>
      )}
    </div>
  );
}
