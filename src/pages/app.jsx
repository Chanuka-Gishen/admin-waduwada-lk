import { Helmet } from 'react-helmet-async';

import { Dashboard } from 'src/sections/dashboard';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | WaduWada.lk </title>
      </Helmet>

      <Dashboard />
    </>
  );
}
