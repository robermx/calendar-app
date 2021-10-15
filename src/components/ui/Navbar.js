export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand">User</span>
        <button className="btn btn-outline-danger">
          <span className="me-2">Log out</span>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};
