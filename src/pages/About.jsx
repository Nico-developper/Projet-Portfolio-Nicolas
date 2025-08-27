import React from "react";
import "../styles/pages/About.scss";
import Seo from "../components/Seo";

export default function About() {
    return (
        <section className='about'>
            <div className='container'>
                <h2>À propos de moi</h2>
                <div className='about-content'>
                    <p>
                        Bonjour, je m'appelle <strong>Nicolas</strong>,
                        développeur web passionné par les interfaces claires,
                        performantes et accessibles. Après plusieurs années dans
                        un autre domaine, j’ai fait le choix d’une reconversion
                        professionnelle pour m’épanouir dans un métier qui me
                        permet de créer, résoudre des problèmes concrets et
                        apprendre en continu.
                    </p>

                    <p>
                        Je me suis formé au développement web grâce à une
                        formation intensive avec OpenClassrooms, qui m’a permis
                        de réaliser plusieurs projets concrets mêlant
                        intégration, développement front-end et back-end,
                        optimisation des performances, SEO et gestion de projet.
                    </p>

                    <p>Aujourd’hui, je suis capable de :</p>

                    <ul>
                        <li>
                            Concevoir des interfaces modernes, adaptatives
                            (responsive) et accessibles
                        </li>
                        <li>
                            Développer en JavaScript et avec des frameworks
                            comme <strong>React</strong>
                        </li>
                        <li>
                            Créer des APIs sécurisées avec{" "}
                            <strong>Node.js</strong> et <strong>Express</strong>
                        </li>
                        <li>
                            Optimiser les sites pour améliorer leur{" "}
                            <strong>performance</strong> et leur{" "}
                            <strong>référencement (SEO)</strong>
                        </li>
                        <li>
                            Travailler en autonomie ou en équipe avec une
                            méthodologie agile
                        </li>
                    </ul>

                    <p>
                        Je suis quelqu’un de rigoureux, curieux et toujours à
                        l’écoute des besoins du client. Mon objectif est de
                        proposer des solutions web à la fois esthétiques,
                        efficaces et durables.
                    </p>

                    <p>
                        Je vis à La Réunion, ce qui me permet de mêler passion
                        pour la nature, les activités sportives comme la
                        randonnée ou le snorkeling, et un cadre de travail
                        inspirant pour la création numérique.
                    </p>

                    <p>
                        N’hésitez pas à consulter mes projets ou à me contacter,
                        je serais ravi d’échanger avec vous !
                    </p>
                </div>
            </div>
        </section>
    );
}
