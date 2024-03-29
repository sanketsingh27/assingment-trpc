import Navbar from './Navbar';

interface ComponentProps {
  children: React.ReactNode;
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
