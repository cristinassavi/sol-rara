function Header() {
  return (
    <aside className="sidebar">
      <img
        src="/logo/AF_SolRara-Logo-RGB_Horizontal-Positivo.png"
        className="logo"
        alt="Sol Rara"
      />

      <nav className="side-menu">
        <a href="#">HOME</a>
        <a href="#">COLEÇÃO</a>
        <a href="#">PROCESSO</a>
      
        <a href="#">SOBRE</a>
        <a href="#">CONTATO</a>
      </nav>
    </aside>
  );
}

export default Header;