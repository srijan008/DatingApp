import '../../index.css';
import { Header } from '../../components/Header';
import { MainBox } from '../../components/Headings';
import { WeDifferent } from '../../components/WeDifferent';
import { Testimonials } from '../../components/Testimonials';
import { PhotoGallery } from '../../components/PhotoGallery';
import { Blog } from '../../components/Blog';
import { Footer } from '../../components/Footer';

function HomePage() {
  return (
    <div className="app-container">
      <Header />
      <MainBox />
      {/* <RotatedImageSlider /> */}
      <WeDifferent />
      <Testimonials />
      <PhotoGallery />
      <Blog />
      <Footer />
    </div>
  );
}

export default HomePage;
