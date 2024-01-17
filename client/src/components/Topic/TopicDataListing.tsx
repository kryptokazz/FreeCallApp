// File: /src/components/SetDataListing.tsx
import React from 'react';
import DataListing from '@data/DataListing';

const TopicDataListing: React.FC = () => {
  return (
    <DataListing
      endpoint="topics"
      keyField="topic_id"
      displayField="topic_name"
      title="Topics Data Listing"
    />
  );
};

export default TopicDataListing;

