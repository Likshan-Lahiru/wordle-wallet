
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ConversionCard from '../components/ConversionCard'
import ProcessSteps from '../components/ProcessSteps'
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto ">
                    <HeroSection />
                    <ConversionCard />
                    <ProcessSteps />
                </div>
            </main>
        </div>
    )
}
export default Home
