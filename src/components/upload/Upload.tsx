import { useAuth0 } from "@auth0/auth0-react";

export default function Upload() {
  const { user } = useAuth0();
  const { logout } = useAuth0();

  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
      <button
        className="btn btn-danger btn-block"
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Log Out
      </button>
    </div>
  );
}
