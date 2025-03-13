import React from "react";

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className="w-full border-collapse border border-gray-300">{children}</table>;
};
