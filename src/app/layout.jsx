import HypothesisLoader from "./_components/providers/hypothesis-loader";
import SessionProvider from "./_components/providers/session";
import AntDProvider from "./_components/providers/theme";

function MainLayout() {
  return (
    <SessionProvider>
      <AntDProvider />
      <HypothesisLoader />
    </SessionProvider>
  );
}
export default MainLayout;
