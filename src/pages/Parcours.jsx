import React from "react";
import "../styles/pages/Parcours.scss";
import Seo from "../components/Seo";
import ProgressTimeline from "../components/ProgressTimeline.jsx";

export default function Parcours() {
    return (
        <div className='progress-section'>
            <ProgressTimeline />
        </div>
    );
}
