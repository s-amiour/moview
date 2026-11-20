import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import * as storage from '../utils/storage';

type ApiConfigModalProps = {
  onClose: () => void;
  onSave: () => void;
};

export default function ApiConfigModal({ onClose, onSave }: ApiConfigModalProps) {
  const [apiKey, setApiKey] = useState<string>(() => storage.getApiKey());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.setApiKey(apiKey);
    onSave();
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog api-config-dialog" role="dialog" aria-modal="true" aria-labelledby="api-config-title">
        <button type="button" className="modal-close-btn" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>

        <form className="api-config-form" onSubmit={handleSubmit}>
          <h2 className="modal-title" id="api-config-title">
            TMDB API Key
          </h2>
          <p className="page-text">
            Paste your TMDB v3 API key (the short key under Settings → API on themoviedb.org). Leave it
            empty to use the sample movies.
          </p>
          <input
            type="text"
            className="search-input api-config-input"
            placeholder="Your TMDB v3 API key"
            aria-label="TMDB API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoFocus
          />
          <div className="modal-footer-actions">
            <button type="submit" className="btn-primary">
              Save Key
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
