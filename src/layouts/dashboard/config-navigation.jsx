import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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
  {
    title: 'Merchants',
    name: NAVBAR_ITEMS.MERCHANTS,
    path: NAVBAR_ITEMS.MERCHANTS,
    icon: <StorefrontIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
  },
  {
    title: 'Subscription Plans',
    name: NAVBAR_ITEMS.SUBSCRIPTION_PLANS,
    path: NAVBAR_ITEMS.SUBSCRIPTION_PLANS,
    icon: <SubscriptionsIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN],
  },
  {
    title: 'Administration',
    name: NAVBAR_ITEMS.ADMINISTRATION,
    path: NAVBAR_ITEMS.ADMINISTRATION,
    icon: <AdminPanelSettingsIcon />,
    permissions: [USER_ROLE.SUPER_ADMIN],
  },
];

export default navConfig;
