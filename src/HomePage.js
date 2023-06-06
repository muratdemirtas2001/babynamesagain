import LogoutButton from "./LogOutButton";
import LoginButton from "./LoginBotton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const Homepage = () => {
  console.log("HELLO FROM HOMEPAGE");
  const { user } = useAuth0();
  console.log(user);

  return (
    <>
      {user && (
        <>
          <Profile />
        </>
      )}
      <>
        <LoginButton />
        <LogoutButton />{" "}
      </>
      <div>Welcometo the home page</div>
    </>
  );
};

export default Homepage;
