import Navbar from "./Navbar";
import Offer from "./Offer";

interface ComponentProps {
  children: React.ReactNode;
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Offer />
      <main>{children}</main>
    </>
  );
};

export default Layout;
