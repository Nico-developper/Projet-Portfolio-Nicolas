import React from 'react';
import '../styles/components/HomeBackground.scss';

export default function HomeBackground() {
  return (
    <div className="homefx" aria-hidden="true">
      <div className="homefx__layer">
        <div className="blob blob--a" />
        <div className="blob blob--b" />
        <div className="blob blob--c" />
      </div>
    </div>
  );
}
