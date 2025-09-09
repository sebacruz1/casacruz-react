import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
};
