const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Weather Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="bg-blue-600 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Weather Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
