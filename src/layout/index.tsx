import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Sider } = Layout;
import styles from './index.module.less';
import NavHeader from './header';
import Footer from './footer';
import SiberMenu from './menu';
import { useStore } from '../store';
export default function LayoutCon() {
    const { collapsed } = useStore();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <SiberMenu />
            </Sider>
            <Layout>
                <NavHeader />
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <Outlet />
                    </div>
                    <Footer></Footer>
                </div>
            </Layout>
        </Layout>
    );
}
