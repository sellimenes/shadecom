import { Welcome } from '../../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroCarousel } from '@/components/HeroCarousel/HeroCarousel';
import '@mantine/carousel/styles.css';
import BestSellers from '@/components/BestSellers/BestSellers';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestSellers />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
