import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';

import { USER_ROLE_ADMIN, USER_ROLE_SUPER_ADMIN } from 'src/constants/user-role';

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    permissions: [USER_ROLE_SUPER_ADMIN, USER_ROLE_ADMIN],
  },
  {
    title: 'Merchant Shops',
    name: NAVBAR_ITEMS.SHOPS,
    path: NAVBAR_ITEMS.SHOPS,
    icon: <StorefrontIcon />,
    permissions: [USER_ROLE_SUPER_ADMIN, USER_ROLE_ADMIN],
  },
  {
    title: 'Shop Users',
    name: NAVBAR_ITEMS.MERCHANTS,
    path: NAVBAR_ITEMS.MERCHANTS,
    icon: <PeopleIcon />,
    permissions: [USER_ROLE_SUPER_ADMIN, USER_ROLE_ADMIN],
  },
  {
    title: 'Subscription Plans',
    name: NAVBAR_ITEMS.SUBSCRIPTION_PLANS,
    path: NAVBAR_ITEMS.SUBSCRIPTION_PLANS,
    icon: <SubscriptionsIcon />,
    permissions: [USER_ROLE_SUPER_ADMIN],
  },
  {
    title: 'Administration',
    name: NAVBAR_ITEMS.ADMINISTRATION,
    path: NAVBAR_ITEMS.ADMINISTRATION,
    icon: <AdminPanelSettingsIcon />,
    permissions: [USER_ROLE_SUPER_ADMIN],
  },
];

export default navConfig;
