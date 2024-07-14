import React, { useState ,useEffect} from 'react';
import { Button, Menu, Dropdown, Space, Drawer } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

export default function Navbar() {
    const [visible, setVisible] = useState(false);

    const items = [
        { key: '1', label: <a target="_blank" rel="noopener noreferrer"> menu item</a> },
        { key: '2', label: <a target="_blank" rel="noopener noreferrer"> menu item</a> },
        { key: '3', label: <a target="_blank" rel="noopener noreferrer">menu item</a> },
    ];

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                closeDrawer();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div>
            <div className='Navbar bg-black w-full px-6 py-4 md:px-7 lg:px-8 flex justify-between items-center'>
                <div className='flex gap-7 items-center'>
                    <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="github-logo">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>

                    </svg>

                    <div className='menu-items text-white hidden lg:grid lg:grid-flow-col gap-2'>
                        <Menu theme="dark" mode="horizontal" className='bg-transparent' style={{ flexWrap: 'nowrap' }}>
                            <Dropdown menu={{ items }}>
                                <Menu.Item key="1"><Space>Product<DownOutlined /></Space></Menu.Item>
                            </Dropdown>
                            <Dropdown menu={{ items }}>
                                <Menu.Item key="2"><Space>Solutions<DownOutlined /></Space></Menu.Item>
                            </Dropdown>
                            <Dropdown menu={{ items }}>
                                <Menu.Item key="3"><Space>Resources<DownOutlined /></Space></Menu.Item>
                            </Dropdown>
                            <Dropdown menu={{ items }}>
                                <Menu.Item key="4"><Space>Open Source<DownOutlined /></Space></Menu.Item>
                            </Dropdown>
                            <Dropdown menu={{ items }}>
                                <Menu.Item key="5"><Space>Enterprise<DownOutlined /></Space></Menu.Item>
                            </Dropdown>
                            <Menu.Item key="6">Pricing</Menu.Item>
                        </Menu>
                    </div>
                </div>

                <div className='btns-part hidden lg:flex'>
                    <Button type='text'>Sign in</Button>
                    <Button type='primary'>Sign Up</Button>
                </div>

                <Button className='lg:hidden' type='text' icon={<MenuOutlined />} onClick={showDrawer} />
            </div>

            <Drawer className='menu-items lg:hidden' title="" placement="right" onClose={closeDrawer} visible={visible}>
                <Menu theme="dark" mode="vertical" className='bg-transparent'>
                    <Dropdown menu={{ items }}>
                        <Menu.Item key="1"><Space>Product<DownOutlined /></Space></Menu.Item>
                    </Dropdown>
                    <Dropdown menu={{ items }}>
                        <Menu.Item key="2"><Space>Solutions<DownOutlined /></Space></Menu.Item>
                    </Dropdown>
                    <Dropdown menu={{ items }}>
                        <Menu.Item key="3"><Space>Resources<DownOutlined /></Space></Menu.Item>
                    </Dropdown>
                    <Dropdown menu={{ items }}>
                        <Menu.Item key="4"><Space>Open Source<DownOutlined /></Space></Menu.Item>
                    </Dropdown>
                    <Dropdown menu={{ items }}>
                        <Menu.Item key="5"><Space>Enterprise<DownOutlined /></Space></Menu.Item>
                    </Dropdown>
                    <Menu.Item key="6">Pricing</Menu.Item>
                    <Menu.Item key="7"><Button type='text'>Sign in</Button></Menu.Item>
                    <Menu.Item key="8"><Button type='primary'>Sign Up</Button></Menu.Item>
                </Menu>
            </Drawer>
        </div>
    );
}
