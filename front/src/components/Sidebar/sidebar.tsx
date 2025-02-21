import './index.css' 

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div>Sidebar</div>
      <ul>
        <li>
          <a href="/">Головна</a>
        </li>
        <li>
          <a href="/auth">Авторизація</a>
        </li>
      </ul>
    </nav>
  );
};
