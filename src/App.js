import { SignInRoute, MainRoute } from "./routes";
import AuthProvider, { AuthIsSignedIn, AuthIsNotSignedIn } from "./context";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AuthIsSignedIn>
          <MainRoute />
        </AuthIsSignedIn>
        <AuthIsNotSignedIn>
          <SignInRoute />
        </AuthIsNotSignedIn>
      </AuthProvider>
    </div>
  );
}

export default App;
