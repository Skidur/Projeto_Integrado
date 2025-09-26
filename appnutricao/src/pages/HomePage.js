import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const { user } = useAuth(); 

    if (user) {
        return (
            <div className="welcome-container">
                <div className="dashboard-header">
                    <h1>Bem-vindo(a) de volta, {user.name || user.email}!</h1>
                    <p>O que você gostaria de fazer agora?</p>
                </div>
                <div className="nav-card-container">
                    <Link to="/resumo" className="nav-card">
                        <h2>Ver Resumo Diário</h2>
                        <p>Acompanhe suas calorias e o total de macronutrientes do dia.</p>
                    </Link>
                    <Link to="/diario" className="nav-card">
                        <h2>Registrar Refeições</h2>
                        <p>Adicione, veja e gerencie os alimentos do seu diário de hoje.</p>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container-apresentacao">
                <header className="header-apresentacao">
                    <h1>Bem-vindo ao Alimetria</h1>
                    <p>Seu assistente pessoal para um acompanhamento nutricional simples e eficaz.</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn btn-primario">Comece Agora</Link>
                        <Link to="/login" className="btn btn-secundario">Já tenho conta</Link>
                    </div>
                </header>

                <section id="features" className="features">
                    <div className="feature">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM10.5 16.5h3.75a.75.75 0 000-1.5h-3.75a.75.75 0 000 1.5z" />
                            </svg>
                        </div>
                        <h2>Registre suas Refeições</h2>
                        <p>Adicione facilmente os alimentos que você consome no café da manhã, almoço, janta e lanches.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                        </div>
                        <h2>Análise Nutricional</h2>
                        <p>Veja instantaneamente o total de calorias, proteínas, carboidratos e gorduras de cada refeição e do seu dia.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                        </div>
                        <h2>Acompanhe seu Progresso</h2>
                        <p>Mantenha um histórico do seu consumo diário para alcançar seus objetivos de saúde e bem-estar.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <h2>Base de Dados Completa</h2>
                        <p>Pesquise em uma vasta biblioteca de alimentos.</p>
                    </div>
                </section>

                <section id="sobre" className="about-section">
                    <div className="about-content">
                        <h2>Sobre o Alimetria</h2>
                        <p>
                            O Alimetria nasceu da ideia de simplificar o acompanhamento nutricional. Acreditamos que todos
                            merecem ter acesso a ferramentas que os ajudem a entender melhor sua alimentação e a tomar decisões
                            mais saudáveis. Nossa missão é fornecer uma plataforma intuitiva, poderosa e acessível para que você
                            possa focar no que realmente importa: sua saúde e bem-estar.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;