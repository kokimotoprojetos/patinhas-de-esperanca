import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Donation from '@/components/Donation';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      <Header />
      <Hero />
      <Stats />
      <Story />
      <Donation />
      <Footer />
    </main>
  );
}
