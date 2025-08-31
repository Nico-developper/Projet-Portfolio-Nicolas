import React from 'react';
import '../styles/components/ProgressBar.scss';

export default function ProgressBar({ label, value = 0, showValue = true }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="progress-row">
      <div className="progress-label">{label}</div>
      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`${label} : ${pct}%`}
      >
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
      {showValue && <div className="progress-value">{pct}%</div>}
    </div>
  );
}
