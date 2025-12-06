import React from 'react';
import '../styles/SearchModal.scss';
import { SearchResult } from './SearchModal';

interface AddEntryButtonProps {
  onClick: () => void;
}

const AddEntryButton: React.FC<AddEntryButtonProps> = ({ onClick }) => (
  <button className="add-entry-btn" onClick={onClick} title="Add Entry">
    <span>＋</span> Add Entry
  </button>
);

export default AddEntryButton;
