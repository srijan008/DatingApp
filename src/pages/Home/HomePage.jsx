import '../../index.css';
import { Header } from '../../components/Header';
import { MainBox } from '../../components/Headings';
import { WeDifferent } from '../../components/WeDifferent';
import { Testimonials } from '../../components/Testimonials';
import { PhotoGallery } from '../../components/PhotoGallery';
import { Blog } from '../../components/Blog';
import { Footer } from '../../components/Footer';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import Content from '../../components/Home/Content';
import Footer2 from '../../components/Home/Footer';
import a from "../../images/Home/a.png"
import b from "../../images/Home/b.png"
import c from "../../images/Home/c.png"
import google from "../../images/Home/google.png"
import logo from "../../assets/datinglogo.png"

function HomePage() {
  return (
    <div className="app-container">
      <Header />
      <MainBox />
      <WhyChooseUs />

      <Content reverse={false} img={a} title={"Search as per your Needs "}
        desc={"Customised your search for your special family based on your needs"}
      />
      <Content reverse={true} img={b} title={"Know more about the Family"}
        desc={"Get informed about the the members of the family you will be spending your life with"}
      />
      <Content reverse={false} img={c} title={"AI-driven match recommendations to suit your preferences"}
        desc={"Get the perfect Match with the help of our Ai-recommendation engine which gives profile suggestions based on your preferneces"}
      />

         <div className="w-full flex flex-col gap-8 sm:flex-row justify-center items-center py-6 bg-[#dbdbdb]">
        <p className='text-xl font-bold '>Download The
          <span className='text-2xl font-extrabold text-[#f47c20]'> Famly </span>
          App</p>
        <a href="" target="_blank" rel="noreferrer">
          <img src={google} alt="playstore" className="w-[250px]" /></a>
      </div>

      <div className='w-full flex flex-col items-center justify-center gap-4 py-8 px-12'>

        <img src={logo} alt="logo" className='h-[130px]' />

        <div className="flex flex-col gap-5 text-[#000000A6] text-2xl font-medium text-left">
          <p>
            Famly, India's trusted family-first matchmaking platform, was created to unite families, not just individuals, in marriage.
          </p>

          <p>
            Famly empowers parents to find matches for their children with verified family profiles that share values and traditions.
          </p>

          <p>
            It offers government ID-verified profiles, horoscope compatibility, and 20+ advanced filters for precise searches by community, location, age, religion, or language.
          </p>

          <p>
            Secure communication through chat and video calls helps families build meaningful relationships.
          </p>

          <p>
            Famly is more than matchmaking—it's where traditions meet technology, bringing families together.
          </p>

          <p>
            Join Famly today to celebrate the union of families and values.
          </p>
        </div>
        

        
</div>

      {/* <RotatedImageSlider /> */}
      {/* <WeDifferent /> */}
      {/* <Testimonials /> */}
      {/* <PhotoGallery /> */}
      {/* <Blog /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage; 
