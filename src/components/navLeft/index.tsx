import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import icons from './iconList';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.scss';
interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface MenuItemFromData {
  key: string;
  label: string;
  icon: string;
  children?: MenuItemFromData[];
}
function NavLeft() {
  const { menuList } = useSelector((state: any) => state.authSlice);//从Redux状态中获取菜单列表
  const navigate = useNavigate();//获取路由导航函数
  const [menuData, setMenuData] = useState<MenuItem[]>([]);//定义状态变量menuData，用于存储转换后的菜单数据
  const location = useLocation();//获取当前路由路径
  // const selectedKey=location.pathname
  useEffect(() => {
    configMenu();//当菜单列表发生变化时，调用configMenu函数转换菜单数据
  }, [menuList]);
  async function configMenu() {
    const mappedMenuItems: MenuItem[] = mapMenuItems(menuList);
    setMenuData(mappedMenuItems);
  }
  //将返回的菜单数据转换成我们需要的格式
  function mapMenuItems(items: MenuItemFromData[]): any {
    return items.map((item: MenuItemFromData) => ({
      key: item.key,
      label: item.label,
      icon: icons[item.icon],
      children: item.children ? mapMenuItems(item.children) : null, //递归操作
    }));
  }
  //处理菜单点击事件，根据点击的菜单键值导航到对应的路由
  function handleClick({ key }: { key: string }) {
    navigate(key);
  }

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="" width={18} />
        <h1>智慧园区</h1>
      </div>

      <Menu
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        theme="dark"
        items={menuData as any}
        onClick={handleClick}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}
export default NavLeft;
