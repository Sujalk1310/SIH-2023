import '../public/Styles.css'

function Link(props) {
  const logout = () => {
    alert("Sure");
    localStorage.removeItem('user_id');
    window.location.href = "/login";
  };

  let sup = false;
  let adm = false;
  let usr = false;

  if (props.filter === "sup") {
    sup = true;
  } else if (props.filter === "adm") {
    adm = true;
  } else {
    usr = true;
  }

  return (
    <div className="sec01">
      <div className="side-link">
        <ul className="nav nav-tabs">
            {!sup && (
                <>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                    </li>
                </>
            )}
          {usr && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/status">Status</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/lodge">Lodge</a>
              </li>
            </>
          )}
          {adm && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/grievance">Grievance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/task">Task</a>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="d-flex align-items-center">
        <span className="mr-2 font-weight-bold bg-light px-3 py-2 rounded border-2 border-black">Welcome, {props.user}</span>
        {/* Add onClick event handler to trigger the logout function */}
        <button className="btn btn-dark" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
export default Link;
