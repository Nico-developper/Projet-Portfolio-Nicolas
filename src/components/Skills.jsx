import React from "react";
import RatingStars from "./RatingStars";
import ProgressBar from "./ProgressBar";
import "../styles/components/Skills.scss";

export default function Skills({
    competences = [],
    languages = [],
    titleCompetences = "Compétences clés",
    titleLanguages = "Langages & technologies",
}) {
    return (
        <div className='skills-block'>
            <div className='skills-section'>
                <h3>{titleCompetences}</h3>
                <div className='skills-list'>
                    {competences.map((c, i) => (
                        <RatingStars key={i} label={c.name} value={c.level} />
                    ))}
                </div>
            </div>
            <div className='skills-section'>
                <h3>{titleLanguages}</h3>
                <div className='skills-list'>
                    {languages.map((l, i) => (
                        <ProgressBar key={i} label={l.name} value={l.value} />
                    ))}
                </div>
            </div>
        </div>
    );
}
