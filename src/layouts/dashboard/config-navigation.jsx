import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';

import { USER_ROLE } from 'src/constants/user-role';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
];

export default navConfig;
