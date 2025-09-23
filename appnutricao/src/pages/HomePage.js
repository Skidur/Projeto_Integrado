import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Bem-vindo ao NutriTrack</h1>
                <p>Seu assistente pessoal para um acompanhamento nutricional simples e eficaz.</p>
                <Link to="/register" className="cta-button">
                    Comece a Monitorar Agora
                </Link>
            </header>

            <section className="features-section">
                <h2>Como Funciona?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Registre suas Refeições</h3>
                        <p>Adicione facilmente os alimentos que você consome no café da manhã, almoço, janta e lanches.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Análise Nutricional</h3>
                        <p>Veja instantaneamente o total de calorias, proteínas, carboidratos e gorduras de cada refeição e do seu dia.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Acompanhe seu Progresso</h3>
                        <p>Mantenha um histórico do seu consumo diário para alcançar seus objetivos de saúde e bem-estar.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;