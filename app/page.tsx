import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroCarousel } from '@/components/HeroCarousel/HeroCarousel';
import { HeroImage } from '@/components/HeroImage/HeroImage';

export default function HomePage() {
  return (
    <>
      {/* <HeroCarousel /> */}
      <HeroImage />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
