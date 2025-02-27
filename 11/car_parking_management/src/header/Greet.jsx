function Greet()
{
    return(
        <>
<h3>Welcome Car Lovers!</h3>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/list">Parking Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/list">Cars List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/create">Add Cars</a>
              </li>
              
            </ul>
            
          </div>
        </div>
    </nav>
    </>
    );
}
export default Greet;