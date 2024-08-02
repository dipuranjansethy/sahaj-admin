// assets
import { IconBrandChrome, IconHelp, IconUserCircle ,IconSitemap, IconApps} from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconUserCircle , IconSitemap,IconApps};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'allutils',
  title: 'All',
  type: 'group',
  children: [
    {
      id: 'allmerchants',
      title: 'Merchants',
      type: 'item',
      url: '/ALL-MERCHANTS',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    },
    {
      id: 'allusers',
      title: 'Users',
      type: 'item',
      url: '/ALL-USERS',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    }
    , 
    {
      id: 'subadmin',
      title: 'Sub-Admin',
      type: 'item',
      url: '/subadmin',
      icon: icons.IconSitemap,
      breadcrumbs: false
    },
    {
      id: 'appbanner',
      title: 'Session Banners',
      type: 'item',
      url: '/app-banner',
      icon: icons.IconApps,
      breadcrumbs: false
    },
    {
      id: 'categoryControl',
      title: 'Category Control',
      type: 'item',
      url: '/categories-control',
      icon: icons.IconApps,
      breadcrumbs: false
    },
    {
      id: 'shopCategoryControl',
      title: 'shop Category Control',
      type: 'item',
      url: '/shop-categories-control',
      icon: icons.IconApps,
      breadcrumbs: false
    },
    {
      id: 'userActivity',
      title: 'User Activity',
      type: 'item',
      url: '/user-activity',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    },
  ]
};

export default other;
