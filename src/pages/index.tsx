import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
        <Header/>
        <main className="bg-white text-black font-sans text-2xl">
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-6xl">Welcome to Audit</h1>
                <h2 className="text-4xl">The best auditing app on the planet</h2>
            </div>
        </main>
        <Footer/>
        </>
    )
    }