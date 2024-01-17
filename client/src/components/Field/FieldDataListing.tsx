// File: /src/components/FieldDataListing.tsx
import React from 'react';
import DataListing from '@data/DataListing';

const FieldDataListing: React.FC = () => {
  return (
    <DataListing
      endpoint="fields"
      keyField="field_id"
      displayField="field_name"
      title="Field Data Listing"
    />
  );
};

export default FieldDataListing;

