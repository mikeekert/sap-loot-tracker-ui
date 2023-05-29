import { useAuth0 } from "@auth0/auth0-react";

export default function Upload() {
  const { user } = useAuth0();

  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}
