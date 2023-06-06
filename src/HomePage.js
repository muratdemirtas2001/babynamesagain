import LogoutButton from "./LogOutButton";
import LoginButton from "./LoginBotton";

const Homepage = () => {
    console.log("HELLO FROM HOMEPAGE")
  return (
    <>
      <div>Welcometo the home page</div>
      <LoginButton />
      <LogoutButton />
    </>
  );
};

export default Homepage;
