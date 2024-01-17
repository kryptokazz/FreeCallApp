// File: /src/components/SetDataListing.tsx
import React from 'react';
import DataListing from '@data/DataListing';

const SetDataListing: React.FC = () => {
  return (
    <DataListing
      endpoint="sets"
      keyField="set_id"
      displayField="set_name"
      title="Sets Data Listing"
    />
  );
};

export default SetDataListing;

